/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Packages
const _chalk = require('chalk'), chalk = new _chalk.Instance(); 
const Discord = require('discord.js');

// fs, path
const fs = require('fs'), path = require('path');

// CustomPackages
const { div } = require('./console');

const commandsDir = path.join(__dirname, '..', 'commands'), 
  eventsDir = path.join(__dirname, '..', 'events');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const version = '0.1'; // Versão do "HANDLERS.JS"

function loadNormalCommands(client = new Discord.Client()) { // Função que inicializa os comandos no Bot
  const cmdsDir = path.join(commandsDir, 'normal');
  const cmdsFolder = fs.readdirSync(cmdsDir); // Lendo a pasta com os comandos.

  
  div();
  var index = 0;
  console.log(`Carregando comandos normal...`, `[${index}/${cmdsFolder.length}]`);


  cmdsFolder.map(fileName => {
    if (!fileName.endsWith('.js')) return; // Caso o arquivo do comando não seja Javascript/NodeJS, a função simplesmente ignora o mesmo.

    let cmdName = fileName.split('.')[0];

    try {
      const file = require(path.join(cmdsDir, fileName));

      if (!file.run) return;

      if (file.help) {
        if (file.help.name) cmdName = file.help.name;
        
        if (file.help.aliases) {
          const aliases = file.help.aliases;

          aliases.map(name => {
            client.commands.set(name, file);
          })
        }
      }

      client.commands.set(cmdName, file); // Isso é para execução do comando, ele ficará guardado num tipo de "Banco de Dados" que só existe enquanto o bot está on.

      client.realCommands.set(cmdName, file); // Isso é para o comando HELP, pois se usar o commands normal o mesmo irá ficar bugado.

      index++;
      console.log(`Comando "${cmdName}" carregado.`, `[${index}/${cmdsFolder.length}]`);
    } catch (err) {
      console.log(`Comando "${cmdName}" não pôde ser carregado.`, `[${index}/${cmdsFolder.length}]`);
      console.error(err);
    }
  });


  console.log(`${index} comandos normais foram carregados com sucesso.`);
  div();

}

function loadSlashCommands(client = new Discord.Client()) { // Função que inicializa os comandos no Bot
  const cmdsDir = path.join(commandsDir, 'slash');
  const cmdsFolder = fs.readdirSync(cmdsDir); // Lendo a pasta com os comandos.

  
  div();
  var index = 0;
  console.log(`Carregando comandos barra...`, `[${index}/${cmdsFolder.length}]`);


  const cmds = cmdsFolder.map(fileName => {
    if (!fileName.endsWith('.js')) return; // Caso o arquivo do comando não seja Javascript/NodeJS, a função simplesmente ignora o mesmo.

    let cmdName = fileName.split('.')[0];

    try {
      const file = require(path.join(cmdsDir, fileName));

      if (!file.run) return;

      if (file.help) {
        if (file.help.name) cmdName = file.help.name;
        
        if (file.help.aliases) {
          const aliases = file.help.aliases;

          aliases.map(name => {
            client.slashCommands.set(name, file);
          })
        }
      }

      client.slashCommands.set(cmdName, file); // Isso é para execução do comando, ele ficará guardado num tipo de "Banco de Dados" que só existe enquanto o bot está on.
      // nesse caso, o realCommands não é necessário.

      index++;
      console.log(`Comando "${cmdName}" carregado.`, `[${index}/${cmdsFolder.length}]`);

      return file;
    } catch (err) {
      console.log(`Comando "${cmdName}" não pôde ser carregado.`, `[${index}/${cmdsFolder.length}]`);
      console.error(err);
    }
  });


  console.log(`${index} comandos barra foram carregados com sucesso.`);
  div();

  return cmds;
}

/**
 * Essa função só pode ser rodada depois ou durante a emissão do evento "ready" no Client.
 * @param {import('discord.js').Client} client
 */
async function loadCommands(client) {
  const c = [loadNormalCommands(client), loadSlashCommands(client)];
  const slash = c[1];
  let slash_help = [];

  if (slash && Array.isArray(slash)) { 
    slash.map(cmd => {
      let help = cmd.help;

      if (help && help.name && help.description) {
        slash_help.push(help);
      }
    });
  
    try {
      await client.application.commands.set(slash_help);
    } catch (err) {
      console.error(err);
    }

    console.log(slash_help);
  }


  return c;
}

function loadEvents(client) { // Função que inicializa os eventos do Bot, disponíveis na pasta "events"
  const eventsFolder = fs.readdirSync(eventsDir); // Lendo a pasta com os eventos.

  div();
  var index = 0;
  console.log(`Carregando eventos...`, `[${index}/${eventsFolder.length}]`);

  eventsFolder.map(fileName => {
    if (!fileName.endsWith('.js')) return; // Caso o arquivo do comando não seja Javascript/NodeJS, a função simplesmente ignora o mesmo.

    const eventName = fileName.split('.')[0];

    try {
      const event = require(path.join(eventsDir, fileName));

      client.on(eventName, event.run.bind(null, client));

      index++;
      console.log(`Evento "${eventName}" carregado.`, `[${index}/${eventsFolder.length}]`);
    } catch (err) {
      console.log(`Evento "${eventName}" não pôde ser carregado.`, `[${index}/${eventsFolder.length}]`);
      console.error(err);
    }
  });

  console.log(`${index} eventos foram carregados com sucesso.`);
  div();
}

module.exports = {
  loadCommands,
  loadNormalCommands,
  loadSlashCommands,
  loadEvents, 
  version
}
