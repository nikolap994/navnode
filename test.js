const { execSync } = require("child_process");

const url = "nikola_server@192.168.56.101";
const dir = "/home/nikola_server/test";

let commands = [
  "lsb_release -a",
  "df -H",
  "date",
  "git status",
  "ls -la",
  "pwd",
];

commands.forEach((command) => {
  command = "'cd " + dir + " ; " + command + "'";
  console.log(command);
  let finalCommand = "ssh " + url + " " + command;
  let response = execSync(finalCommand).toString();
  console.log("----------------------------------");
  console.log(response);
});
