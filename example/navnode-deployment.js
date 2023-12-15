// Define deployment environments
const environments = {
  staging: {
    user: "root",
    server: "test.com", // Or use the IP of the server.
    path: "/home/example/web/example.com/public_html",
  },
};

// Define available tasks
const tasks = {
  staging_deploy: {
    task: [
      "git fetch --tags",
      "git status",
      "git pull",
      "notifyDeployment --navnode_extend",
    ],
  },
};

// Extend Navnode functionality if needed
const extend = {
  notifyDeployment: () => {
    console.log("Console log from the extend function.");
  },
};

// Export environments and extend for Navnode to use
exports.extend = extend;
exports.environments = environments;
exports.tasks = tasks;
