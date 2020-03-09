const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const createDir = require('../handlers/createDir');
const cors = require('./cors');

const mail = require('./components/mail');
const filesystem = require('./components/filesystem');

module.exports = async (app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      components: {
        securitySchemes: {
          basicAuth: { type: "http", scheme: "basic" },
        }
      },
      openapi: '3.0.1',
      info: {
        title: 'Swagger',
        version: '1.0.0-alpha',
        description: 'A sample API',
      },
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      },
      security: {
        basicAuth: []
      },
      host: `localhost:${process.env.SERVER_PORT}`,
      basePath: '/',
    },
    apis: ['./components/user/model/index.js', './components/user/routes/index.js']
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true
  }));

  app.use((req, res, next) => {
    cors(req, res, next);
  });

  await createDir('../files');

  app.use('/mail', mail.routes);
  app.use('/filesystem', filesystem.routes);
  app.use('/files', express.static('../files'));
};
