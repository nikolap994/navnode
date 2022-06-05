#!/usr/bin/env node

const { execSync } = require("child_process");

class Navis {
  constructor(config, environment) {
    this.config = config;
    this.environment = environment;
  }

  execute = () => {
    const config = this.config;
    const environment = this.environment;
    const environmentConfig = config[environment];

    const url = environmentConfig.server;
    const path = environmentConfig.path;

    let commands = environmentConfig.tasks;

    commands.forEach((command) => {
      command = "'cd " + path + " ; " + command + "'";
      
      let finalCommand = "ssh " + url + " " + command;
      let response = execSync(finalCommand).toString();
      
      console.log("----------------------------------");
      console.log(response);
    });
  };
}

module.exports = Navis;
