const deployer = require("../index");

deployer.initConfig({
  default: {
    deployTo: "/home/nikola_server/test",
    repositoryUrl: "https://github.com/user/super-project.git",
  },
  staging: {
    servers: "nikola_server@192.168.56.101",
  },
});

console.log(deployer);
deployer.task("123");
