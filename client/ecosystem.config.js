module.exports = {
  apps: [{
    name: "client",
    script: "npm",
    args: "run start",
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      HOST: '0.0.0.0',
      PORT: 3002
    }
  }]
}
