'use strict';

const humanize = ms => {
  let unit;
  let value;
  if (ms < 1000) {
    value = Math.round(ms);
    unit = 'ms';
  } else if (ms < 60000) {
    value = (ms / 1000).toFixed(1);
    unit = 'secs';
  } else if (ms < 3600000) {
    value = (ms / 60000).toFixed(1);
    unit = 'mins';
  } else {
    value = (ms / 3600000).toFixed(1);
    unit = 'hours';
  }

  if (value % 1 === 0) {
    return `${Math.round(value)} ${unit}`;
  } else {
    return `${value} ${unit}`;
  }
};

module.exports = { humanize };
