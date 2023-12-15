const colors = require("colors");
const path = require("path");
const { exit } = require("process");
const { execSync } = require("child_process");
const fs = require("fs");

/**
 * Gets the configuration from the navnode-deployment.js file.
 * @returns {Object} The configuration object.
 */
function getNavnodeConfig() {
  try {
    return require(path.resolve("./navnode-deployment.js"));
  } catch (err) {
    handleError(err);
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
    handleError(err);
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
    handleError(err);
  }
}

/**
 * Handles errors by logging and exiting the process.
 * @param {Error} err - The error object.
 */
function handleError(err) {
  console.log(colors.bgRed(err));
  exit();
}

/**
 * Executes SSH commands on a remote server for deployment.
 * @param {string} env - The name of the environment to deploy to.
 * @param {string} task - The name of the task to execute during deployment.
 */
exports.deploy = function (env, task) {
  if (!env) {
    console.log(colors.red("Missing environment"));
    return;
  }

  try {
    const environmentConfig = getConfig(env);
    const { user, server, path: remotePath } = environmentConfig;
    const url = `${user}@${server}`;

    const commands = getTask(task);

    commands.forEach((command) => {
      if (command.includes("--navnode_extend")) {
        try {
          command = command.replace("--navnode_extend", "").trim();
          const config = getNavnodeConfig();
          config.extend[command]();
        } catch (err) {
          handleError(err);
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
    handleError(err);
  }
};

/**
 * Syncs files from a specific environment using rsync.
 * @param {string} env - The name of the environment to pull from.
 * @param {string} task - The name of the task associated with the pull operation.
 */
function rsync(env, task, isPull) {
  if (!env) {
    console.log(colors.red("Missing environment"));
    return;
  }

  try {
    const environmentConfig = getConfig(env);
    const { user, server, path: remotePath } = environmentConfig;
    const url = `${user}@${server}`;

    const rsyncCommand = isPull
      ? `rsync -rltDvhzP ${url}:${remotePath}${task} ${task}`
      : `rsync -rltDvhzP ${task} ${url}:${remotePath}${task}`;

    console.log("----------------------------------");
    execSync(rsyncCommand, { stdio: "inherit" });
    console.log("----------------------------------");
  } catch (err) {
    handleError(err);
  }
}

/**
 * Pulls code from a specific environment using rsync.
 * @param {string} env - The name of the environment to pull from.
 * @param {string} task - The name of the task associated with the pull operation.
 */
exports.rsyncPull = function (env, task) {
  rsync(env, task, true);
};

/**
 * Pushes code to a specific environment using rsync.
 * @param {string} env - The name of the environment to push to.
 * @param {string} task - The name of the task associated with the push operation.
 */
exports.rsyncPush = function (env, task) {
  rsync(env, task, false);
};

/**
 * Initializes the navnode-deployment module by creating a configuration file.
 * This function writes a JavaScript file named 'navnode-deployment.js' with
 * predefined environment and task configurations.
 *
 * @throws {Error} If there is an issue writing the configuration file.
 * @returns {void}
 */
exports.init = function () {
  const content = `
const environments = {
  staging: {
    user: "",
    server: "",
    path: "",
  },
};

const tasks = {
  deploy: {
    task: [

    ],
  },
};

exports.environments = environments;
exports.tasks = tasks;
`;

  try {
    fs.writeFileSync("navnode-deployment.js", content);
  } catch (err) {
    handleError(err);
  }
};
