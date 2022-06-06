#!/usr/bin/env node

const colors = require("colors");
const navis = require("../lib/navis");

var arguments = process.argv.splice(2);
var env = null;

if (arguments[0] == "--env") {
  env = arguments[1];
}

if (env) {
  console.log(colors.blue("Navis deploying to " + env));
  const deployment = navis.deploy(env);
  if (typeof deployment !== "undefined") {
    console.log(colors.blue(navis.deploy(env)));
  }
} else {
  console.log(colors.red("Missing environment"));
}
