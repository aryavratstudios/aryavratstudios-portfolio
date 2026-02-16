export async function getDiscordStatus() {
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken || !guildId) return { status: 'missing_config' };

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
            headers: { 'Authorization': `Bot ${botToken}` }
        });

        if (response.ok) {
            const data = await response.json();
            return { status: 'connected', guildName: data.name };
        }

        const errorData = await response.json();
        return { status: 'error', message: errorData.message || 'Verification failed' };
    } catch (error) {
        return { status: 'error', message: 'API unreachable' };
    }
}

export async function createDiscordTicket(projectName: string, clientName: string) {
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!guildId || !botToken) {
        console.error("Discord configuration missing");
        return null;
    }

    try {
        const channelName = `ticket-${projectName.toLowerCase().replace(/\s+/g, '-')}`;

        // Create private channel
        // Permission overwrites: @everyone (deny view), bot (allow view)
        // Note: For a real production bot, you'd also add the client's discord ID if synced.
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: channelName,
                type: 0, // Guild Text Channel
                topic: `Project: ${projectName} | Client: ${clientName}`,
                parent_id: process.env.DISCORD_TICKET_CATEGORY || null,
                permission_overwrites: [
                    {
                        id: guildId, // @everyone role ID is the same as guild ID
                        type: 0,
                        allow: "0",
                        deny: "1024" // VIEW_CHANNEL
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Discord API Error (Details):", JSON.stringify(errorData, null, 2));
            return null;
        }

        const channel = await response.json();
        const channelUrl = `https://discord.com/channels/${guildId}/${channel.id}`;

        // Send welcome message
        await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `🚀 **New Project Ticket Created!**\n\n**Project:** ${projectName}\n**Client:** ${clientName}\n\nOur team will be with you shortly. Please join the server if you haven't already: ${process.env.DISCORD_INVITE_URL}`
            })
        });

        return {
            id: channel.id,
            url: channelUrl
        };
    } catch (error) {
        console.error("Failed to create Discord ticket:", error);
        return null;
    }
}
