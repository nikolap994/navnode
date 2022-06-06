#!/usr/bin/env node

const colors = require("colors");
const navnode = require("../lib/navnode");

var arguments = process.argv.splice(2);
var env = null;

if (arguments[0] == "--env") {
  env = arguments[1];
}

if (env) {
  console.log(colors.blue("Navnode deploying to " + env));
  const deployment = navnode.deploy(env);
  if (typeof deployment !== "undefined") {
    console.log(colors.blue(navnode.deploy(env)));
  }
} else {
  console.log(colors.red("Missing environment"));
}
