// get pending commits remote
// get log on remote
// checkout all changes on remote
// git pull on remote
// rollback changes ?!
// execute custom commands

// const fs = require("fs");
// const { exec } = require("child_process");

// const args = process.argv.slice(2);
// if (typeof args !== undefined) {
//   try {
//     const envirionment = args[0];
//     const rawdata = fs.readFileSync(envirionment);
//     const commands = JSON.parse(rawdata);

//     const url = commands.url;
//     const deploy = commands.deploy;

//     deploy.forEach((command) => {
//       exec(command, (err, stdout, stderr) => {
//         if (err) {
//           console.error(err);
//           return;
//         }

//         console.log(stdout);
//         console.log(stderr);
//       });
//     });
//   } catch (err) {
//     console.error(err);
//   }
// } else {
//   console.log("Missing envirionment variable");
// }
