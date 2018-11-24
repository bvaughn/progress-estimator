'use strict';

const humanize = ms => {
  let unit;
  let value;
  if (ms < 1e3) {
    value = Math.round(ms);
    unit = 'ms';
  } else if (ms < 60e3) {
    value = (ms / 1e3).toFixed(1);
    unit = 'secs';
  } else if (ms < 360e3) {
    value = (ms / 60e3).toFixed(1);
    unit = 'mins';
  } else {
    value = (ms / 360e3).toFixed(1);
    unit = 'hours';
  }

  if (value % 1 === 0) {
    return `${Math.round(value)} ${unit}`;
  } else {
    return `${value} ${unit}`;
  }
};

module.exports = { humanize };
