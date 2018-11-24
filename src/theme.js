'use strict';

const chalk = require('chalk');

// Material colors from the 700 column
// https://material.io/tools/color
const colors = {
  gray: '#78909c',
  green: '#00c853',
  yellow: '#ffd600'
};

const theme = chalk.constructor();
theme.asciiCompleted = theme.hex(colors.green);
theme.asciiInProgress = theme.hex(colors.yellow);
theme.estimate = theme.hex(colors.gray);
theme.label = theme;
theme.percentage = theme;
theme.progressBackground = theme.dim.hex(colors.green);
theme.progressForeground = theme.hex(colors.green);

module.exports = theme;
