const express = require('express');
const sequelize = require('./core/db');
const {
  server_port
} = require('./core/core.config');
const app = express();
const init = require('./core');
const connector = require('./connector');

require('dotenv').config();

init(app);
connector.associations(app);
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
