import chalk from 'chalk';
import createLogger, { ChalkTheme, LogFunction } from '..';

// Test promises
const stringPromise = new Promise<string>(resolve => resolve('hello'));
const numberPromise = new Promise<number>(resolve => resolve(10));

// Chalk theme
const chalkTheme = chalk.constructor() as ChalkTheme;
chalkTheme.asciiCompleted = chalkTheme;
chalkTheme.asciiInProgress = chalkTheme;
chalkTheme.estimate = chalkTheme;
chalkTheme.estimateExceeded = chalkTheme;
chalkTheme.label = chalkTheme;
chalkTheme.percentage = chalkTheme;
chalkTheme.progressBackground = chalkTheme;
chalkTheme.progressForeground = chalkTheme;

// logFunction
const logFunction: LogFunction = (...text: string[]) => {};
logFunction.done = () => {};
logFunction.clear = () => {};

// Check `createLogger`
const logger = createLogger();
createLogger({
  spinner: {
    interval: 100,
    frames: ['.', '']
  }
});
createLogger({
  storagePath: 'path/to/dir'
});
createLogger({
  theme: chalkTheme
});
createLogger({
  logFunction: logFunction
});
createLogger({
  spinner: { interval: 100, frames: ['.', ''] },
  storagePath: 'path/to/dir',
  theme: chalkTheme,
  logFunction: logFunction
});

const resultOne: Promise<string> = logger(
  stringPromise,
  'This promise has no initial estimate'
);
const resultTwo: Promise<number> = logger(
  numberPromise,
  'This promise is initially estimated to take 1 second',
  { estimate: 1000 }
);
const resultThree: Promise<number> = logger(numberPromise, 'Valid export');
