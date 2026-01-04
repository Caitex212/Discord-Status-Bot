const db = require('../utils/db');
const { getServerStatus } = require('./serverQuery');
const createEmbed = require('../utils/createEmbed');

async function updateEmbeds(client) {
    const trackedServers = db.prepare('SELECT * FROM tracked_servers').all();

    for (const server of trackedServers) {
        try {
            let serverStatus = null
            try {
                serverStatus = await getServerStatus(server.ip, server.port, server.server_type);
            } catch (error) {}
            const channel = await client.channels.fetch(server.channel_id)
            const message = await channel.messages.fetch(server.message_id);
            if (!message) {
                console.warn(`Message with ID ${server.message_id} not found in channel ${server.channel_id}.`);
                continue;
            }
            const embed = await createEmbed(serverStatus, server.ip, server.port, server.server_type);
            if (embed) {
                await message.edit({ embeds: [embed] });
            }
        } catch (error) {
            console.error(`Error updating embed for server ${server.embed_id}:`, error);
        }
    }
}

module.exports = (client) => {
    updateEmbeds(client); 
    setInterval(() => updateEmbeds(client), 60 * 1000);
};