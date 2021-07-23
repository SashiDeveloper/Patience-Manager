const getUptime = require('../../utils/uptime');
const emoji = require('../json/emojis');
let ram = (process.memoryUsage().rss / 1024 / 1024).toFixed(2)


exports.run = async (client, message, args) => {
  message.channel.send(`
**Status**
> Ping Bot: ${Date.now() - message.createdTimestamp}ms
> Ping API: ${client.ws.ping}ms
> Uptime: ${getUptime(client).formatted}
> Ram: ${ram}mb
`);
}

exports.help = {
  name: 'botinfo',
  aliases: [
    'bi'
  ]
}
