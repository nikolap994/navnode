const deployer = require("../index");

deployer.initConfig({
  default: {
    deployTo: "/var/apps/super-project",
    repositoryUrl: "https://github.com/user/super-project.git",
  },
  staging: {
    servers: "deploy@staging.super-project.com",
  },
});

console.log(deployer);
