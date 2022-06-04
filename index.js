#!/usr/bin/env node

const args = process.argv.slice(2);

if (typeof args !== undefined) {
    const envirionment = args[0];
    console.log(envirionment);
} else {
  console.log("Missing envirionment variable");
}
