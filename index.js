const deployer = require("./navis");

const config = {
  staging: {
    server: "nikola_server@192.168.0.16",
    path: "/home/nikola_server/test/Cryptographic-JSON-Database",
    branch: "main",
    tasks: ["git status", "git pull", "ls -la", "pwd"],
  },
};

const Navis = new deployer(config, "staging");

Navis.execute();
