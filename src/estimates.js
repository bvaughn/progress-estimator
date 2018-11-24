'use strict';

const { createHash } = require('crypto');
const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const getEstimate = (id, estimatedDuration, storagePath) => {
  const durations = getPreviousDurations(id, storagePath);

  if (durations.length < 3 && estimatedDuration) {
    durations.push(estimatedDuration);
  }

  if (durations.length > 0) {
    return (
      durations.reduce((total, current) => total + current, 0) /
      durations.length
    );
  } else {
    return estimatedDuration;
  }
};

const getFilePath = (id, storagePath) => {
  const shasum = createHash('sha1');
  shasum.update(id);

  return join(storagePath, shasum.digest('hex'));
};

const getPreviousDurations = (id, storagePath) => {
  const path = getFilePath(id, storagePath);
  if (existsSync(path)) {
    return readFileSync(path, 'utf8')
      .split('\n')
      .filter(line => line)
      .map(line => Number.parseInt(line, 10));
  }
  return [];
};

const updateEstimate = (id, duration, storagePath) => {
  if (!existsSync(storagePath)) {
    mkdirSync(storagePath);
  }

  const durations = getPreviousDurations(id, storagePath);
  durations.push(duration);

  if (durations.length > 10) {
    durations.shift();
  }

  const path = getFilePath(id, storagePath);
  writeFileSync(path, durations.join('\n'));
};

module.exports = {
  getEstimate,
  updateEstimate
};
