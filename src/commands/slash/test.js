const getUptime = require('../../utils/uptime');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').CommandInteraction} interaction
 */
exports.run = async (client, interaction) => {
  message.channel.send(`Ping API: ${client.ws.ping}ms | Uptime: ${getUptime(client).formatted}`);
}

exports.help = {
  name: 'test',
  description: "Comando de teste.",
}
