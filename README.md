# Navnode: Universal Deployment and Automation Tool

## Introduction

Navnode is a powerful and versatile deployment and automation tool designed to simplify the process of managing tasks on remote servers or within local environments. Unlike traditional tools like Capistrano or Fabric, Navnode provides an intuitive and flexible way to deploy applications and automate various tasks with ease.

## Key Features

Navnode offers a range of features to enhance your deployment and automation workflow:

- **Customizable Tasks**: Write your own tasks using JavaScript, allowing you to tailor your automation to specific needs.

- **Built-in Commands**: Define tasks using built-in commands or create your own custom commands for maximum flexibility.

## Getting Started

To start using Navnode, simply follow these steps:

1. Install Navnode globally using npm:

   ```sh
   npm install -g navnode
   ```

2. Create a deployment configuration file, typically named `navnode-deployment.js`, and define your deployment environment and tasks.

Here's an example of a deployment file (`navnode-deployment.js`):

```javascript
// Define deployment environments
const environments = {
  staging: {
    user: "nikola_server",
    server: "192.168.0.16",
    path: "/home/nikola_server/test/Cryptographic-JSON-Database",
  },
};

// Define available tasks
const tasks = {
  status: {
    task: ['git status']
  },
  current_path: {
    task: ['pwd']
  },
  list_dirs: {
    task: ['ls -la']
  }
}

// Extend Navnode functionality if needed
const extend = {
  extendTask: () => console.log("Custom method was executed"),
};

// Export environments and extend for Navnode to use
exports.environments = environments;
exports.extend = extend;

// Your deployment configuration is ready!
```

3. Run Navnode from the command line using the following syntax:

   ```sh
   navnode <environment>:<task>
   ```

   For example, to check the status of your staging environment, use:

   ```sh
   navnode staging:status
   ```

With Navnode, you have the power to streamline your deployment and automation processes, making it easier than ever to manage your projects effectively.

**Note**: If you define custom commands, remember to export the `extend` object as well.

Discover the possibilities with Navnode and take control of your deployment and automation tasks like a pro.
