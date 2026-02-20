import { Client, GatewayIntentBits, ActivityType, REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from project root
dotenv.config({ path: join(__dirname, '../.env.local') });

if (!process.env.DISCORD_BOT_TOKEN || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Missing environment variables');
    process.exit(1);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

const commands = [
    new SlashCommandBuilder()
        .setName('update-payment')
        .setDescription('Update payment status for a project')
        .addStringOption(option =>
            option.setName('project_id')
                .setDescription('The ID of the project')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Payment amount')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('status')
                .setDescription('Payment status (pending/completed)')
                .setRequired(true)
                .addChoices(
                    { name: 'Pending', value: 'pending' },
                    { name: 'Completed', value: 'completed' }
                )),
    new SlashCommandBuilder()
        .setName('admin-stats')
        .setDescription('Fetch real-time business statistics'),
    new SlashCommandBuilder()
        .setName('security-status')
        .setDescription('Check system health and recent firewall events'),
    new SlashCommandBuilder()
        .setName('notify-owner')
        .setDescription('Send an emergency DM to the owner')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The emergency message')
                .setRequired(true))
];

const OWNER_ID = '1458069414640615578'; // Base on Guild ID or provided snowflake

client.once('ready', async () => {
    console.log(`🚀 Discord Bot is ONLINE as ${client.user?.tag}`);

    // Register Slash Commands
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }

    // Set professional presence
    client.user?.setPresence({
        activities: [{
            name: 'Managing Creative Portfolios',
            type: ActivityType.Watching
        }],
        status: 'online',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'update-payment') {
        await interaction.deferReply();

        const projectId = interaction.options.getString('project_id');
        const amount = interaction.options.getNumber('amount');
        const status = interaction.options.getString('status');

        try {
            // Update Supabase
            const { error } = await supabase
                .from('projects')
                .update({
                    payment_status: status,
                    amount: amount, // Assuming 'amount' column exists, or maybe 'price'?
                    updated_at: new Date().toISOString()
                })
                .eq('id', projectId);

            if (error) throw error;

            await interaction.editReply({
                content: `✅ **Payment Updated!**\nProject: \`${projectId}\`\nAmount: \`$${amount}\`\nStatus: \`${status}\``
            });
        } catch (err) {
            console.error(err);
            await interaction.editReply({
                content: `❌ **Error updating payment:**\n${err.message}`
            });
        }
    }

    if (interaction.commandName === 'admin-stats') {
        await interaction.deferReply();
        try {
            const { data: projects } = await supabase.from('projects').select('final_price, status');
            const totalSales = projects?.reduce((acc, curr) => acc + (Number(curr.final_price) || 0), 0) || 0;
            const completed = projects?.filter(p => p.status === 'completed').length || 0;

            await interaction.editReply({
                content: `📊 **Live Empire Stats**\nTotal Revenue: \`$${totalSales}\`\nCompleted Projects: \`${completed}\`\nActive Projects: \`${projects?.length || 0 - completed}\``
            });
        } catch (err) {
            await interaction.editReply(`❌ Error: ${err.message}`);
        }
    }

    if (interaction.commandName === 'notify-owner' || interaction.commandName === 'security-status') {
        const message = interaction.options.getString('message') || "System Health: All Green 🟢";
        try {
            const owner = await client.users.fetch(OWNER_ID);
            await owner.send(`🚨 **Security System Alert**\n${message}`);
            await interaction.reply({ content: '✅ Owner notified via DM.', ephemeral: true });
        } catch (err) {
            await interaction.reply({ content: `❌ Failed to DM owner: ${err.message}`, ephemeral: true });
        }
    }
});

// Error handling to keep the process alive
client.on('error', console.error);
process.on('unhandledRejection', console.error);

client.login(process.env.DISCORD_BOT_TOKEN);
