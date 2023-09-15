const _ = require("lodash");
const colors = require("colors");
const path = require("path");
const { exit } = require("process");
const { execSync } = require("child_process");

/**
 * Gets the configuration from the navnode-deployment.js file.
 * @returns {Object} The configuration object.
 */
function getNavnodeConfig() {
  try {
    const config = require(path.resolve("./navnode-deployment.js"));
    return config;
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

/**
 * Gets the configuration for a specific environment.
 * @param {string} env - The name of the environment.
 * @returns {Object} The environment configuration object.
 */
function getConfig(env) {
  try {
    return getNavnodeConfig().environments[env];
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

/**
 * Gets the task associated with a specific name.
 * @param {string} task - The name of the task.
 * @returns {string} The task command.
 */
function getTask(task) {
  try {
    return getNavnodeConfig().tasks[task].task;
  } catch (err) {
    console.log(colors.bgRed(err));
    exit();
  }
}

/**
 * Deploys code to a specific environment.
 * @param {string} env - The name of the environment to deploy to.
 * @param {string} task - The name of the task to execute during deployment.
 */
exports.deploy = function (env, task) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const user = environmentConfig.user;
      const url = `${user}@${environmentConfig.server}`;
      const remotePath = environmentConfig.path;

      const commands = getTask(task);

      commands.forEach((command) => {
        if (command.includes("--navnode_extend")) {
          try {
            command = command.replace("--navnode_extend", "").trim();

            const config = getNavnodeConfig();

            config.extend[command]();
          } catch (err) {
            console.log(colors.bgRed(err));
          }
          return;
        }
        const sshCommand = `cd ${remotePath} && ${command}`;
        const finalCommand = `ssh ${url} "${sshCommand}"`;
        const response = execSync(finalCommand).toString();

        console.log("----------------------------------");
        console.log(colors.green(response));
      });
    } catch (err) {
      console.log(colors.bgRed(err));
    }
  }
};

/**
 * Pulls code from a specific environment using rsync.
 * @param {string} env - The name of the environment to pull from.
 * @param {string} task - The name of the task associated with the pull operation.
 */
exports.rsyncPull = function (env, task) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const user = environmentConfig.user;
      const url = `${user}@${environmentConfig.server}`;
      const remotePath = environmentConfig.path;

      let rsyncCommand = `rsync -rltDvhzP ${url}:${remotePath}${task} ${task}`;

      console.log("----------------------------------");
      execSync(rsyncCommand, { stdio: 'inherit' });
      console.log("----------------------------------");
    } catch (err) {
      console.log(colors.bgRed(err));
    }
  }
};

/**
 * Pushes code to a specific environment using rsync.
 * @param {string} env - The name of the environment to push to.
 * @param {string} task - The name of the task associated with the push operation.
 */
exports.rsyncPush = function (env, task) {
  if (env) {
    try {
      const environmentConfig = getConfig(env);
      const user = environmentConfig.user;
      const url = `${user}@${environmentConfig.server}`;
      const remotePath = environmentConfig.path;

      let rsyncCommand = `rsync -rltDvhzP ${task} ${url}:${remotePath}${task}`;

      console.log("----------------------------------");
      execSync(rsyncCommand, { stdio: 'inherit' });
      console.log("----------------------------------");
    } catch (err) {
      console.log(colors.bgRed(err));
    }
  }
};