const getUptime = require('../utils/uptime');
const random = require('random');

exports.run = async (client) => { // Esse evento é emitido assim que o bot é ligado e está pronto pra receber outros eventos.
  let index = 0;
  let presence = `Meu prefixo padrão é "${client.config.DEFAULT_PREFIX}"`;

  console.log(`${client.user.tag}: iniciado; ${client.users.cache.size} usuários e ${client.guilds.cache.size} servidores`);
  
  function setPresence() {
    const presences = [{text: `Uptime: ${getUptime(client).formatted}`}, `Meu prefixo padrão é "${client.config.DEFAULT_PREFIX}"`];
    index = random.int(0, presences.length - 1);
    
    presence = presences[index];

    client.user.setPresence({
      activity: {
        name: `🎈 | ${presence['text'] || presence} `,
        type: (presence['type']) ? presence['type'] : "PLAYING"
      }
    })
  }

  setPresence();
  if (!client.underDevelopment) setInterval(setPresence, 5 * 1000);
}
