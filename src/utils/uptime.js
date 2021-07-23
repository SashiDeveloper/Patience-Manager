const {DateTime} = require('luxon');

const {getFormattedTime} = require('./time');

module.exports = (client) => {
  const startedAt = DateTime.fromMillis(Date.now() - client.uptime);
  const now = DateTime.now();
  const diff = now.diff(startedAt).shiftTo('days', 'hour', 'minutes', 'seconds');

  var formatted = getFormattedTime(diff);

  return {now, startedAt, diff, formatted};
}

module.exports.version = "0.2";
