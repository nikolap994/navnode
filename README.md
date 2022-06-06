# Navnode 

Universal deployment and automation tool.

![93145e85-f0b2-4690-8682-91fe60eade10](https://repository-images.githubusercontent.com/499848268/f5f5c077-3243-44cc-afc9-f400eed44e49)

Navnode is automation and deployment tool. 
Navnode is alternation to other builds, such as Capistano or Fabric.
It is easy to deploy or to automate tasks on your remote servers or in local environment.

### List of features are as follows:
- Write your own task using Javascript.
- Define tasks with built in commands or use your own custom ones.

### Usage
Install using npm:
`npm install -g navnode`


Example of the deployment file (`navnode-depolyment.js`).
Create file `navnode-depolyment.js` and add following:
```js
// environments variable requires following objects:
// - server - username@ip of the targeted server
// - path - path of the dir where commands will be executed
// - tasks - tasks that will be run
const environments = {
  staging: {
    server: "nikola_server@192.168.0.16",
    path: "/home/nikola_server/test/Cryptographic-JSON-Database",
    tasks: [
      "git status",
      "git pull",
      "ls -la",
      "pwd",
      "extendTask --navnode_extend",
    ],
  },
};

// Commands can be executed by appending --navnode_extend to function call
// function needs to be defined in the extend variable
const extend = {
  extendTask: () => console.log("method was executed"),
};

// By default environments needs to be exported.
exports.environments = environments;

// If custom commands are defined, extend needs to be exported as well.
exports.extend = extend;
```

Run from command line `navnode --env staging`