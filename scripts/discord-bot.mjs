import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env from project root
dotenv.config({ path: join(__dirname, '../.env.local') });

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.once('ready', () => {
    console.log(`🚀 Discord Bot is ONLINE as ${client.user?.tag}`);

    // Set professional presence
    client.user?.setPresence({
        activities: [{
            name: 'Managing Creative Portfolios',
            type: ActivityType.Watching
        }],
        status: 'online',
    });
});

// Error handling to keep the process alive
client.on('error', console.error);
process.on('unhandledRejection', console.error);

if (!process.env.DISCORD_BOT_TOKEN) {
    console.error('❌ DISCORD_BOT_TOKEN is missing in .env.local');
    process.exit(1);
}

client.login(process.env.DISCORD_BOT_TOKEN);
