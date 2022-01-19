'use strict';

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_MODE = {
  ACTUAL: 'ACTUAL',
  REMAINING: 'REMAINING'
};
const ACTUAL_MS_UNIT = {
  MS: 'ms',
  SECS: 'secs',
  MINS: 'mins',
  HOURS: 'hours'
};
const REMAINING_MS_UNIT = {
  MS: 'ms',
  S: 's',
  M: 'm',
  H: 'h'
};

const getMsUnit = (ms, msMode) => {
  let unit;
  if (ms < MS_PER_SECOND) {
    unit = msMode === MS_MODE.ACTUAL ? ACTUAL_MS_UNIT.MS : REMAINING_MS_UNIT.MS;
  } else if (ms < MS_PER_MINUTE) {
    unit =
      msMode === MS_MODE.ACTUAL ? ACTUAL_MS_UNIT.SECS : REMAINING_MS_UNIT.S;
  } else if (ms < MS_PER_HOUR) {
    unit =
      msMode === MS_MODE.ACTUAL ? ACTUAL_MS_UNIT.MINS : REMAINING_MS_UNIT.M;
  } else {
    unit =
      msMode === MS_MODE.ACTUAL ? ACTUAL_MS_UNIT.HOURS : REMAINING_MS_UNIT.H;
  }

  return unit;
};

const getActualMs = msActual => {
  if (msActual < MS_PER_SECOND) {
    msActual = Math.round(msActual);
  } else if (msActual < MS_PER_MINUTE) {
    msActual = (msActual / MS_PER_SECOND).toFixed(1);
  } else if (msActual < MS_PER_HOUR) {
    msActual = (msActual / MS_PER_MINUTE).toFixed(1);
  } else {
    msActual = (msActual / MS_PER_HOUR).toFixed(1);
  }

  return msActual;
};

const getRemainingMS = (msElapsed, msEstimated) => {
  if (msEstimated < MS_PER_SECOND) {
    msElapsed = Math.round(msElapsed);
    msEstimated = Math.round(msEstimated);
  } else if (msEstimated < MS_PER_MINUTE) {
    msElapsed = (msElapsed / MS_PER_SECOND).toFixed(1);
    msEstimated = (msEstimated / MS_PER_SECOND).toFixed(1);
  } else if (msEstimated < MS_PER_HOUR) {
    msElapsed = (msElapsed / MS_PER_MINUTE).toFixed(1);
    msEstimated = (msEstimated / MS_PER_MINUTE).toFixed(1);
  } else {
    msElapsed = (msElapsed / MS_PER_HOUR).toFixed(1);
    msEstimated = (msEstimated / MS_PER_HOUR).toFixed(1);
  }

  return {
    _msElapsed: msElapsed,
    _msEstimated: msEstimated
  };
};

const humanizeActual = msActual => {
  const unit = getMsUnit(msActual, MS_MODE.ACTUAL);
  const _msActual = getActualMs(msActual);

  if (msActual % 1 === 0) {
    return `${Math.round(_msActual)} ${unit}`;
  }
  return `${_msActual} ${unit}`;
};

const humanizeRemaining = (msElapsed, msEstimated) => {
  const unit = getMsUnit(msEstimated, MS_MODE.REMAINING);
  const { _msElapsed, _msEstimated } = getRemainingMS(msElapsed, msEstimated);

  return `${_msElapsed}${unit}, estimated ${_msEstimated}${unit}`;
};

module.exports = {
  humanizeActual,
  humanizeRemaining
};
