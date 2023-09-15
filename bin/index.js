#!/usr/bin/env node

const colors = require("colors");
const navnode = require("../lib/navnode");

/**
 * The main entry point for the Navnode command-line utility.
 */
var arguments = process.argv.splice(2);
var env = null;
var task = null;

// Parse the provided arguments to determine the environment and task.
env = arguments[0].split(':')[0];
task = arguments[0].split(':')[1];

if (env && task) {
  if (task.includes("deploy")) {
    console.log(colors.blue("Navnode deploying to " + env));
  } else if (!task.includes("rsync")) {
    console.log(colors.blue("Navnode executing " + env + ':' + task));
  }

  if ('rsync_pull' === task) {
    console.log(colors.blue("Navnode syncing files from " + env));
    navnode.rsyncPull(env, arguments[1]);
    return;
  }

  if ('rsync_push' === task) {
    console.log(colors.blue("Navnode syncing files to " + env));
    navnode.rsyncPush(env, arguments[1]);
    return;
  }

  const deployment = navnode.deploy(env, task);
  
  if (typeof deployment !== "undefined") {
    console.log(colors.blue(navnode.deploy(env)));
  }
} else {
  console.log(colors.red("Missing environment or task"));
}
