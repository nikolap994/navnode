#!/usr/bin/env node

const colors = require("colors");
const navnode = require("../lib/navnode");
const path = require("path");

/**
 * The main entry point for the Navnode command-line utility.
 */
const arguments = process.argv.slice(2);
const arg = arguments[0];
const [env, task] = arg.split(":");

if (env && task) {
  if (task.includes("deploy")) {
    console.log(colors.blue(`Navnode deploying to ${env}`));
  } else if (!task.includes("rsync")) {
    console.log(colors.blue(`Navnode executing ${env}:${task}`));
  }

  if (task === "rsync_pull") {
    console.log(colors.blue(`Navnode syncing files from ${env}`));
    navnode.rsyncPull(env, arguments[1]);
  } else if (task === "rsync_push") {
    console.log(colors.blue(`Navnode syncing files to ${env}`));
    navnode.rsyncPush(env, arguments[1]);
  } else {
    const deployment = navnode.deploy(env, task);

    if (typeof deployment !== "undefined") {
      console.log(colors.blue(deployment));
    }
  }
} else {
  if (arg === "init") {
    const configFile = "navnode-deployment.js";
    try {
      const config = require(path.resolve(`./${configFile}`));
      if (config) {
        console.log(`${configFile} already found.`);
      }
      return config;
    } catch (err) {
      if (err.code === "MODULE_NOT_FOUND") {
        console.log(`${configFile} not found. Creating the file...`);
        navnode.init();
        console.log(`${configFile} created successfully. Please configure it.`);
      }
    }
  } else {
    console.log(colors.red("Missing environment or task"));
  }
}
