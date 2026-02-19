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
                ))
];

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
});

// Error handling to keep the process alive
client.on('error', console.error);
process.on('unhandledRejection', console.error);

client.login(process.env.DISCORD_BOT_TOKEN);
