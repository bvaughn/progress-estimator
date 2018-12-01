'use strict';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;

const humanizeActual = msActual => {
  let unit;
  if (msActual < MS_PER_SECOND) {
    msActual = Math.round(msActual);
    unit = 'ms';
  } else if (msActual < MS_PER_MINUTE) {
    msActual = (msActual / MS_PER_SECOND).toFixed(1);
    unit = 'secs';
  } else if (msActual < MS_PER_HOUR) {
    msActual = (msActual / MS_PER_MINUTE).toFixed(1);
    unit = 'mins';
  } else {
    msActual = (msActual / MS_PER_HOUR).toFixed(1);
    unit = 'hours';
  }

  if (msActual % 1 === 0) {
    return `${Math.round(msActual)} ${unit}`;
  }
  return `${msActual} ${unit}`;
};

const humanizeRemaining = (msElapsed, msEstimated) => {
  let unit;
  if (msEstimated < MS_PER_SECOND) {
    msElapsed = Math.round(msElapsed);
    msEstimated = Math.round(msEstimated);
    unit = 'ms';
  } else if (msEstimated < MS_PER_MINUTE) {
    msElapsed = (msElapsed / MS_PER_SECOND).toFixed(1);
    msEstimated = (msEstimated / MS_PER_SECOND).toFixed(1);
    unit = 's';
  } else if (msEstimated < MS_PER_HOUR) {
    msElapsed = (msElapsed / MS_PER_MINUTE).toFixed(1);
    msEstimated = (msEstimated / MS_PER_MINUTE).toFixed(1);
    unit = 'm';
  } else {
    msElapsed = (msElapsed / MS_PER_HOUR).toFixed(1);
    msEstimated = (msEstimated / MS_PER_HOUR).toFixed(1);
    unit = 'h';
  }

  return `${msElapsed}${unit}, estimated ${msEstimated}${unit}`;
};

module.exports = {
  humanizeActual,
  humanizeRemaining
};
