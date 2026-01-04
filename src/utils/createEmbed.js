module.exports = async (serverStatus, ip, port, serverType) => {
    // Offline / no response
    if (!serverStatus) {
        return {
            title: `🔴 Server Offline`,
            description: `**Server is offline or not responding**`,
            color: 0xE74C3C,
            fields: [
                {
                    name: '🌐 Address',
                    value: `${ip}:${port}`,
                    inline: false
                }
            ],
            footer: {
                text: 'Last checked'
            },
            timestamp: new Date()
        };
    }

    if (serverType === 'ase') {
        try {
            const {
                name,
                map,
                maxplayers,
                numplayers,
                players = [],
                ping,
                connect
            } = serverStatus;

            const embed = {
                title: `🟢 ${name}`,
                description: `**Server is online and responding**`,
                color: 0x2ECC71,
                fields: [
                    {
                        name: '🗺️ Map',
                        value: map || 'Unknown',
                        inline: true
                    },
                    {
                        name: '👥 Players',
                        value: `${numplayers}/${maxplayers}`,
                        inline: true
                    },
                    {
                        name: '📡 Ping',
                        value: `${ping} ms`,
                        inline: true
                    },
                    {
                        name: '🔗 Connect',
                        value: `\`${connect}\``,
                        inline: false
                    }
                ],
                footer: {
                    text: 'Live server status'
                },
                timestamp: new Date()
            };

            if (players.length > 0) {
                embed.fields.push({
                    name: `🎮 Current Players (${players.length})`,
                    value: players
                        .map(p => `• ${p.name || 'Unknown Player'}`)
                        .join('\n')
                        .slice(0, 1024) // Discord field safety
                });
            } else {
                embed.fields.push({
                    name: '🎮 Current Players',
                    value: '_No players online_'
                });
            }

            return embed;

        } catch (error) {
            console.error('Error creating embed:', error);
            return null;
        }
    }
};
