const environments = {
    "staging": {
        "server": "nikola_server@192.168.0.16",
        "path": "/home/nikola_server/test/Cryptographic-JSON-Database",
        "tasks": [
            "git status",
            "git pull",
            "ls -la",
            "pwd"
        ]
    }
}

module.exports = environments;