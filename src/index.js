'use strict';

const { dots } = require('cli-spinners');
const logUpdate = require('log-update');
const { tmpdir } = require('os');

const { humanizeActual, humanizeRemaining } = require('./humanize');
const { getEstimate, updateEstimate } = require('./estimates');
const { getPercentageString, getProgressBar } = require('./progress');

// Default configuration
let spinner = dots;
let theme = require('./theme');
let storagePath = `${tmpdir()}/progress-estimator`;

const configure = options => {
  if (options.storagePath) {
    storagePath = options.storagePath;
  }
  if (options.theme) {
    theme = options.theme;
  }
  if (options.spinner) {
    spinner = options.spinner;
  }
};

const logProgress = async (promise, label, estimatedDuration = 0) => {
  try {
    // Refine our estimate using previous durations.
    estimatedDuration = getEstimate(label, estimatedDuration, storagePath);

    const startTime = Date.now();

    const { frames, interval } = spinner;

    let index = 0;

    const id = setInterval(() => {
      index = ++index % frames.length;

      let updateString = theme`{asciiInProgress ${
        frames[index]
      }} {label ${label}}`;

      if (estimatedDuration > 0) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = estimatedDuration - elapsedTime;

        let humanizedEstimate = humanizeRemaining(
          elapsedTime,
          estimatedDuration
        );
        humanizedEstimate =
          remainingTime < 0
            ? theme.estimateExceeded(humanizedEstimate)
            : theme.estimate(humanizedEstimate);

        const progressBar = getProgressBar(
          elapsedTime / estimatedDuration,
          theme
        );

        updateString += theme` ${progressBar} {estimate ${humanizedEstimate}}`;
      }

      logUpdate(updateString);
    }, interval);

    const returnValue = await promise;

    clearInterval(id);

    const actualDuration = Date.now() - startTime;

    // Record the actual duration for later.
    // It will help us predict future runs more accurately.
    updateEstimate(label, actualDuration, storagePath);

    const humanizedActual = humanizeActual(actualDuration);

    logUpdate(
      theme`{asciiCompleted ✓} {label ${label}} {estimate ${humanizedActual}}`
    );
    logUpdate.done();

    return returnValue;
  } catch (error) {
    logUpdate.clear();

    throw error;
  }
};

logProgress.configure = configure;
logProgress.logProgress = logProgress;

module.exports = logProgress;
