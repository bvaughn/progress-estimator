'use strict';

const getProgressBar = (percentage, theme) => {
  percentage = Math.max(0, Math.min(1, percentage));

  let string = '';
  for (let i = 0; i < 1; i += 0.05) {
    string +=
      percentage > 0 && i <= percentage
        ? theme.progressForeground('█')
        : theme.progressBackground('█');
  }

  return theme`${string} {percentage ${Math.round(percentage * 100)}%}`;
};

module.exports = {
  getProgressBar
};
