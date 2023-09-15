#!/usr/bin/env node

const colors = require("colors");
const navnode = require("../lib/navnode");

/**
 * The main entry point for the Navnode command-line utility.
 */
const arguments = process.argv.slice(2);
const arg = arguments[0];
const [env, task] = arg.split(':');

if (env && task) {
  if (task.includes("deploy")) {
    console.log(colors.blue(`Navnode deploying to ${env}`));
  } else if (!task.includes("rsync")) {
    console.log(colors.blue(`Navnode executing ${env}:${task}`));
  }

  if (task === 'rsync_pull') {
    console.log(colors.blue(`Navnode syncing files from ${env}`));
    navnode.rsyncPull(env, arguments[1]);
  } else if (task === 'rsync_push') {
    console.log(colors.blue(`Navnode syncing files to ${env}`));
    navnode.rsyncPush(env, arguments[1]);
  } else {
    const deployment = navnode.deploy(env, task);

    if (typeof deployment !== "undefined") {
      console.log(colors.blue(deployment));
    }
  }
} else {
  console.log(colors.red("Missing environment or task"));
}
