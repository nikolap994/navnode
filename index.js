#!/usr/bin/env node

const initConfig = (config) => {
  console.log(config);
};

const task = (task) => {
  console.log(task);
};

exports.initConfig = initConfig;
exports.task = task;
