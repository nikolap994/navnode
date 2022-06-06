const _ = require("lodash");
const colors = require("colors");
const path = require("path");
const { exit } = require("process");
const { execSync } = require("child_process");

function getConfig(env) {
  try {
    const config = require(path.resolve("./navis-depolyment.js"));
    return config[env];
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

exports.deploy = function (env) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const url = environmentConfig.server;
      const path = environmentConfig.path;

      let commands = environmentConfig.tasks;

      commands.forEach((command) => {
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
