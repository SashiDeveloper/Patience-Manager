//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Discord = require('discord.js'),
 client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.config = {
  DEFAULT_PREFIX: ';',
}

client.express = require('express')();

client.commands = new Discord.Collection();
client.realCommands = new Discord.Collection();
client.slashCommands = new Discord.Collection();

const handlers = require('./utils/handlers');

const site = require('./site/index');

const ping = require('./utils/ping')

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('ready', async () => {
  await handlers.loadCommands(client)
  try {
    await require("./site/index")(client)
  } catch (err) {
    console.error(err);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Carregando os eventos
handlers.loadEvents(client);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(process.env.TOKEN).catch(err => {console.error(err); process.exit()});

process.on('beforeExit', () => {
  client && client.destroy(); // destruindo o client, para que não haja nenhum erro de Client inexistente ao iniciar um novo processo.
});

'<end> by SashiDeveloper & MKIsHereOficial </end>';
