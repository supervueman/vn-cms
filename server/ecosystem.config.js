module.exports = {
  apps: [{
    name: 'server',
    script: 'app.js',
    args: '',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      HOST: '0.0.0.0',
      PORT: 3000
    }
  }]
};
