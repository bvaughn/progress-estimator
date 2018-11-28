'use strict';
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const humanizeActual = msActual => {
  let unit;
  if (msActual < SECOND) {
    msActual = Math.round(msActual);
    unit = 'ms';
  } else if (msActual < MINUTE) {
    msActual = (msActual / SECOND).toFixed(1);
    unit = 'secs';
  } else if (msActual < HOUR) {
    msActual = (msActual / MINUTE).toFixed(1);
    unit = 'mins';
  } else {
    msActual = (msActual / HOUR).toFixed(1);
    unit = 'hours';
  }

  if (msActual % 1 === 0) {
    return `${Math.round(msActual)} ${unit}`;
  }
  return `${msActual} ${unit}`;
};

const humanizeRemaining = (msElapsed, msEstimated) => {
  let unit;
  if (msEstimated < SECOND) {
    msElapsed = Math.round(msElapsed);
    msEstimated = Math.round(msEstimated);
    unit = 'ms';
  } else if (msEstimated < MINUTE) {
    msElapsed = (msElapsed / SECOND).toFixed(1);
    msEstimated = (msEstimated / SECOND).toFixed(1);
    unit = 's';
  } else if (msEstimated < HOUR) {
    msElapsed = (msElapsed / MINUTE).toFixed(1);
    msEstimated = (msEstimated / MINUTE).toFixed(1);
    unit = 'm';
  } else {
    msElapsed = (msElapsed / HOUR).toFixed(1);
    msEstimated = (msEstimated / HOUR).toFixed(1);
    unit = 'h';
  }

  return `${msElapsed}${unit}, estimated ${msEstimated}${unit}`;
};

module.exports = {
  humanizeActual,
  humanizeRemaining
};
