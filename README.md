# Navnode: Universal Deployment and Automation Tool

## Introduction

Navnode is an advanced deployment and automation tool designed to simplify the management of tasks in remote servers or local environments. Unlike traditional tools such as Capistrano or Fabric, Navnode provides an intuitive and flexible solution for deploying applications and automating various tasks with ease.

## Key Features

Navnode offers a set of powerful features to enhance your deployment and automation workflow:

- **Customizable Tasks**: Write your tasks in JavaScript, giving you the flexibility to tailor your automation to specific needs.

- **Built-in Commands**: Define tasks using pre-built commands or create custom commands for maximum flexibility.

## Getting Started

To start using Navnode, follow these simple steps:

1. Install Navnode globally using npm:

   ```sh
   npm install -g navnode
   ```

2. Create a deployment configuration file, typically named `navnode-deployment.js`, and and define your deployment environment and tasks.

Example deployment file (`navnode-deployment.js`, the example file is in the example folder):

```javascript
// Define deployment environments
const environments = {
  staging: {
    user: "root",
    server: "test.com", // Or use the IP of the server.
    path: "/home/example/web/example.com/public_html",
  },
};

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

const extend = {
  notifyDeployment: () => {
    console.log("Console log from the extend function.");
  },
};

exports.extend = extend;
exports.environments = environments;
exports.tasks = tasks;
```

3. Run Navnode from the command line using the following syntax:

   ```sh
   navnode <environment>:<task>
   ```

   For example, to check the status of your staging environment, use:

   ```sh
   navnode staging:staging_deploy
   ```

Navnode empowers you to streamline deployment and automation processes, making project management more efficient.

**Note**: When defining custom commands, ensure the `extend` object is exported as well.

Explore the possibilities with Navnode and take control of your deployment and automation tasks like a professional.

## Features

Navnode enhances automation with additional commands, making it accessible for everyone. Here is a list of commands and instructions on how to use them:

### Rsync Pull Command
```sh
navnode <environment>:rsync_pull file_path
```

- `<environment>`: Specify the deployment environment.
- `file_path`: Provide the path of the file or folder on the remote server.

### Example:
```sh
navnode staging:rsync_pull /example/test.js
```

This command will rsync the specified file (`test.js`) from the staging environment to your local machine.

### Rsync Push Command

Use the following command to synchronize files or folders from your local environment to the remote server:

```sh
navnode <environment>:rsync_push file_path
```

- `<environment>`: Specify the deployment environment.
- `file_path`: Provide the path of the file or folder on the remote server.

### Example:
```sh
navnode staging:rsync_push /example/test.js
```

This command will rsync the specified file (`test.js`) from your local machine to the staging environment on the remote server.

These commands empower users to efficiently manage file synchronization between local and remote environments, enhancing the versatility of Navnode for automation.