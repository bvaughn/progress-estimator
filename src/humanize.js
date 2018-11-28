'use strict';
const SECOND = 1000;

const humanizeActual = msActual => {
  let unit;
  if (msActual < SECOND * 1) {
    msActual = Math.round(msActual);
    unit = 'ms';
  } else if (msActual < 60 * SECOND) {
    msActual = (msActual / SECOND).toFixed(1);
    unit = 'secs';
  } else if (msActual < 60 * 60 * SECOND) {
    msActual = (msActual / (60 * SECOND)).toFixed(1);
    unit = 'mins';
  } else {
    msActual = (msActual / (60 * 60 * SECOND)).toFixed(1);
    unit = 'hours';
  }

  if (msActual % 1 === 0) {
    return `${Math.round(msActual)} ${unit}`;
  }
  return `${msActual} ${unit}`;
};

const humanizeRemaining = (msElapsed, msEstimated) => {
  let unit;
  if (msEstimated < SECOND * 1) {
    msElapsed = Math.round(msElapsed);
    msEstimated = Math.round(msEstimated);
    unit = 'ms';
  } else if (msEstimated < 60 * SECOND) {
    msElapsed = (msElapsed / SECOND).toFixed(1);
    msEstimated = (msEstimated / SECOND).toFixed(1);
    unit = 's';
  } else if (msEstimated < 60 * 60 * SECOND) {
    msElapsed = (msElapsed / (60 * SECOND)).toFixed(1);
    msEstimated = (msEstimated / (60 * SECOND)).toFixed(1);
    unit = 'm';
  } else {
    msElapsed = (msElapsed / (60 * 60 * SECOND)).toFixed(1);
    msEstimated = (msEstimated / (60 * 60 * SECOND)).toFixed(1);
    unit = 'h';
  }

  return `${msElapsed}${unit}, estimated ${msEstimated}${unit}`;
};

module.exports = {
  humanizeActual,
  humanizeRemaining
};
