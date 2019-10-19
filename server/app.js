const express = require('express');
const sequelize = require('./core/db');
const {
  server_port
} = require('./core/core.config');
require('dotenv').config();

const app = express();
const init = require('./core');
init(app);

// Routes use
const connector = require('./connector');
connector.routes(app);

async function connect() {
  const connect = await sequelize.sync();

  if (!connect) {
    console.log('Not connect!');
    return;
  }

  await connector.init();

  app.listen(server_port, () => {
    console.log(`Server listen on http://localhost:${server_port}`);
  });
}

connect();
