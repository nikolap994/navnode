const _ = require("lodash");
const colors = require("colors");
const path = require("path");
const { exit } = require("process");
const { execSync } = require("child_process");

function getNavnodeConfig() {
  try {
    const config = require(path.resolve("./navnode-deployment.js"));
    return config;
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

function getConfig(env) {
  try {
    return getNavnodeConfig().environments[env];
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

function getTask(task) {
  try {
    return getNavnodeConfig().tasks[task].task;
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

exports.deploy = function (env, task) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const user = environmentConfig.user;
      const url = user + "@" + environmentConfig.server;
      const path = environmentConfig.path;

      let commands = getTask(task);

      commands.forEach((command) => {
        if (command.includes("--navnode_extend")) {
          try {
            command = command.replace("--navnode_extend", "");
            command = command.replace(" ", "");

            const config = getNavnodeConfig();

            config["extend"][command]();
          } catch (err) {
            console.log(colors.bgRed(err));
          }
          return;
        }
        command = "'cd " + path + " ; " + command + "'";

        let finalCommand = "ssh " + url + " " + command;
        let response = execSync(finalCommand).toString();

        console.log("----------------------------------");
        console.log(colors.green(response));
      });
    } catch (err) {
      console.log(colors.bgRed(err));
    }
  }
};


exports.rsyncPull = function (env, task) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const user = environmentConfig.user;
      const url = user + "@" + environmentConfig.server;
      const path = environmentConfig.path;

      let rsyncCommand = 'rsync -rltDvhzP ' + url + ':' + path;
      rsyncCommand += task + ' ' + task;

      console.log("----------------------------------");
      execSync(rsyncCommand, {stdio: 'inherit'});   
      console.log("----------------------------------");
    } catch (err) {
      console.log(colors.bgRed(err));
    }
  }
};


exports.rsyncPush = function (env, task) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const user = environmentConfig.user;
      const url = user + "@" + environmentConfig.server;
      const path = environmentConfig.path;

      let rsyncCommand = 'rsync -rltDvhzP ' + task + ' ' + url + ':' + path;
      rsyncCommand += task;

      console.log("----------------------------------");
      execSync(rsyncCommand, {stdio: 'inherit'});
      console.log("----------------------------------");
    } catch (err) {
      console.log(colors.bgRed(err));
    }
  }
};