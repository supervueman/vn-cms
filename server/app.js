const express = require('express');
const sequelize = require('./core/db');
const { server_port } = require('./core/core.config');
const app = express();
const init = require('./core');
const connector = require('./connector');

require('dotenv').config();

// Globals
const logger = require('./core/global/logger');
const sendRes = require('./core/global/response');

init(app);
connector.associations();
connector.routes(app);

sequelize
  .authenticate()
  .then(() => {
    return sequelize.sync();
  })
  .then(connect => {
    if (!connect) {
      logger('error', 'db-connect', 500, 'app.js');
      console.log('Not connect!');
      return;
    }

    const server = app.listen(server_port, () => {
      global.logger = logger;
      global.sendRes = sendRes;
      console.log(`Server listen on http://localhost:${server_port}`);
    });

    connector.init(server);
  })
  .catch(err => {
    throw new Error(err);
  });
