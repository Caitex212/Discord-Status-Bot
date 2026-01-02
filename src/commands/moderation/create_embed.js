const {  PermissionsBitField, MessageFlags } = require('discord.js');
const { getServerStatus } = require('../../services/serverQuery');

module.exports =  {
    name: 'create_embed',
    description: 'Creates an embed message for the server status.',
    deleted: false,
    permissionsRequired: [PermissionsBitField.Flags.Administrator],
    botPermissions: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.ManageMessages],

    callback: async (client, interaction) => {
        const supportedServers = process.env.SUPPORTED_SERVERS ? process.env.SUPPORTED_SERVERS.split(',') : [];
        if (!supportedServers.includes(process.env.SERVER_TYPE)) {
            interaction.reply({content: `Server type ${process.env.SERVER_TYPE} is not supported yet.` , flags: [MessageFlags.Ephemeral]});
            return;
        }

        interaction.reply({content: 'Trying to reach server...', flags: [MessageFlags.Ephemeral]});

        let serverStatus = null;
        try {
            serverStatus = await getServerStatus();
        } catch (error) {
            console.error("Error fetching server status:", error);
            interaction.editReply({content: 'Failed to reach server.'});
            return;
        }

        try {
            const { name, map, maxplayers, numplayers, players, ping, connect } = serverStatus;
            const embed = {
                title: `Server Status: ${name}`,
                description: `Map: ${map}\nPlayers: ${numplayers}/${maxplayers}\nPing: ${ping}ms\nConnect: ${connect}`,
                fields: players.length ? [
                    {
                        name: 'Current Players',
                        value: players.map(p => p.name).join('\n')
                    }
                ] : [],
                color: 0x00FF00,
                timestamp: new Date()
            };
        } catch (error) {
            console.error("Error creating embed:", error);
            interaction.editReply({content: 'Error creating server status embed.'});
            return;
        }

        await interaction.channel.send({ embeds: [embed] });
    }
}