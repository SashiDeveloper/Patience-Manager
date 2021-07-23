const { MessageAttachment } = require('discord.js');
const random = require('random');

/**
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 * @param {string[]} args
 */
exports.run = async (client, message, args) => {
  const shitpostIndex = random.int(1, 28);
  const apiURL = `https://p.dandan449.repl.co/shit/${shitpostIndex}`;
  const image = new MessageAttachment(apiURL, `shitpost_${shitpostIndex}.jpg`);

  message.reply({files: [image]});
}

exports.help = {
  name: 'shitpost',
  aliases: [
    'shit'
  ]
}
