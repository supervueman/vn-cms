const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const createDir = require('../handlers/createDir');
const cors = require('./cors');

const mail = require('./components/mail');
const filesystem = require('./components/filesystem');

const swaggerDefinition = {
  info: {
    title: 'Swagger',
    version: '1.0.0-alpha',
    description: 'A sample API',
  },
  host: `localhost:${process.env.SERVER_PORT}`,
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./components/authenticate/routes/index.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = async (app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use((req, res, next) => {
    cors(req, res, next);
  });

  await createDir('../files');

  app.use('/files', express.static('../files'));
  app.use('/mail', mail.routes);
  app.use('/filesystem', filesystem.routes);
};
