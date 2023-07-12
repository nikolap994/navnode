#!/usr/bin/env node

const colors = require("colors");
const navnode = require("../lib/navnode");

var arguments = process.argv.splice(2);
var env = null;
var task = null;

env = arguments[0].split(':')[0];
task = arguments[0].split(':')[1];

if (env && task) {
  console.log(colors.blue("Navnode deploying to " + env + ':' + task));
  if ('rsync_pull' === task) {
    navnode.rsyncPull(env, arguments[1]);
    return;
  }

  if ('rsync_push' === task) {
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
