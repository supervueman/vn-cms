const express = require('express');
const bodyParser = require('body-parser');
const createDir = require('../handlers/createDir');
const cors = require('./cors');

const mail = require('./components/mail');
const filesystem = require('./components/filesystem');

module.exports = async (app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    cors(req, res, next);
  });

  await createDir('../files');

  app.use('/files', express.static('../files'));

  app.use('/mail', mail.routes);
  app.use('/filesystem', filesystem.routes);
}
