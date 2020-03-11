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

  if (process.env.NODE_ENV === 'development') {
    const swaggerUi = require('swagger-ui-express');
    const swaggerJSDoc = require('swagger-jsdoc');
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
      apis: ['./components/user/model/index.js', './components/user/routes/index.js', './components/role/model/index.js', './components/role/routes/index.js', './components/systemsetting/model/index.js', './components/systemsetting/routes/index.js', './components/context/model/index.js', './components/context/routes/index.js', './components/dictionary/model/index.js', './components/dictionary/routes/index.js', './components/resourcetype/model/index.js', './components/resourcetype/routes/index.js', './components/layout/model/index.js', './components/layout/routes/index.js', './components/fieldcategory/model/index.js', './components/fieldcategory/routes/index.js', './components/resource/model/index.js', './components/resource/routes/index.js', './components/field/model/index.js', './components/field/routes/index.js', './components/additionalfield/model/index.js', './components/additionalfield/routes/index.js', './components/authenticate/routes/index.js', './core/components/mail/routes/index.js', './components/profile/routes/index.js', './core/components/filesystem/routes/index.js']
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      explorer: true
    }));
  }

  app.use((req, res, next) => {
    cors(req, res, next);
  });

  await createDir('../files');

  app.use('/mail', mail.routes);
  app.use('/filesystem', filesystem.routes);
  app.use('/files', express.static('../files'));
};
