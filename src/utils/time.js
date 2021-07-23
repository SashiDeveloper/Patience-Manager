const { DateTime } = require('luxon');

module.exports.getFormattedTime = (date, timestamp = Date.now(), full = false) => {
  if (!date && timestamp) {
    date = DateTime.fromMillis(timestamp);
  } else if (!timestamp && !date) {
    date = DateTime.now();
  }

  var formatted = date.toFormat(`s's'`);

  if (date.minutes > 0 || date.minute > 0) formatted = date.toFormat(`m'm' s's'`);
  if (date.hours > 0 || date.hour > 0) formatted = date.toFormat(`h'h' m'm' s's'`);

  if (date.days > 0 || date.day > 0) formatted = date.toFormat(`d'd' h'h' m'm'`);

  if (full) {
    formatted = date.toFormat(`d'd' h'h' m'm' s's'`);
  }


  return formatted;
}

module.exports.version = "0.2"
