#!/usr/bin/env node
'use strict';

const { join } = require('path');
const createLogger = require('.');

// All configuration keys are optional, but it's recommended to specify a storage location.
// Learn more about configuration options below.
const logger = createLogger({
  storagePath: join(__dirname, '.progress-estimator')
});

const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1500);
});

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 5000);
});

const promiseThree = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 5300);
});

(async () => {
  await logger(promiseOne, 'No initial estimate');
  await logger(promiseTwo, 'Long task', {
    estimate: 5000
  });
  await logger(promiseThree, 'Short task', {
    estimate: 5300
  });
})();
