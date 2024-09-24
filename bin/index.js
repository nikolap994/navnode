#!/usr/bin/env node

// Import required modules
const colors = require("colors");
const navnode = require("../lib/navnode");
const figlet = require("figlet");
const path = require("path");

/**
 * The main entry point for the Navnode command-line utility.
 */

// Parse command line arguments
const arguments = process.argv.slice(2);
const arg = arguments[0];
const [env, task] = arg.split(":");
const additionalArgument = arguments[1];

// Check if the required argument is missing
if (!arg) {
  console.log(colors.red("Missing environment or task"));
} else if (arg === "init") {
  // Handle 'init' command
  handleInitCommand();
} else {
  // Handle other Navnode commands
  handleNavnodeCommand(env, task, additionalArgument);
}

/**
 * Handles the 'init' command, creating the configuration file if it does not exist.
 * @returns {Object|undefined} The configuration object if it exists, otherwise undefined.
 */
function handleInitCommand() {
  // Specify the configuration file name
  const configFile = "navnode-deployment.js";

  try {
    // Attempt to require the configuration file
    const config = require(path.resolve(`./${configFile}`));
    console.log(`${configFile} already found.`);
    return config;
  } catch (err) {
    // Handle the case when the configuration file is not found
    if (err.code === "MODULE_NOT_FOUND") {
      console.log(`${configFile} not found. Creating the file...`);
      navnode.init();
      console.log(`${configFile} created successfully. Please configure it.`);
    }
  }
}

/**
 * Handles other Navnode commands based on the provided environment and task.
 * @param {string} env - The name of the environment.
 * @param {string} task - The name of the task.
 * @param {string} additionalArgument - Additional argument for specific tasks.
 */
function handleNavnodeCommand(env, task, additionalArgument) {
  // Check if environment or task is missing
  if (!env || !task) {
    console.log(colors.red("Missing environment or task"));
    return;
  }

  // Display information based on the task
  if (task.includes("deploy")) {
    console.log(colors.blue(figlet.textSync("Deploying to " + env + "...")));
  } else if (!task.includes("rsync")) {
    console.log(colors.blue(`Executing ${env}:${task}`));
  }

  // Handle rsync tasks
  if (task === "rsync_pull" || task === "rsync_push") {
    const direction = task === "rsync_pull" ? "from" : "to";
    console.log(colors.blue(figlet.textSync(`Syncing files ${direction} ${env}`)));
    
    const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const capitalizedTask = capitalizeFirstLetter(task.split("_")[1]);
    navnode[`rsync${capitalizedTask}`](env, additionalArgument);
  } else {
    // Handle deployment task
    const deployment = navnode.deploy(env, task);

    // Display deployment information
    if (typeof deployment !== "undefined") {
      console.log(colors.blue(deployment));
    }
  }
}
