const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
require('dotenv').config();

// Handlers
const createDir = require('./handlers/createDir');

// Routes
const authenticateRoutes = require('./routes/authenticate');
const profileRoutes = require('./routes/profile');
const user = require('./components/user');
const role = require('./components/role');
const resource = require('./components/resource');
const resourcetype = require('./components/resourcetype');
const layout = require('./components/layout');
const field = require('./components/field');
const fieldcategory = require('./components/fieldcategory');
const additionalfield = require('./components/additionalfield');
const filesystemRoutes = require('./routes/filesystem');
const mailRoutes = require('./routes/mail');
const systemsetting = require('./components/systemsetting');
const dictionary = require('./components/dictionary');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const allowedOrigins = process.env.CORS_ACCESS_URL.split(', ');
  const origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, x-api-key, x-reset-token');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  if (req.url.indexOf('files') <= 0) {
    if (req.headers.authorization === `Basic ${Buffer.from(process.env.AUTHORIZATION_LOGIN + ':' + process.env.AUTHORIZATION_PASSWORD).toString('base64')}`) {
      next();
    } else {
      res.status(401).send({
        message: 'Not authorization!'
      });
    }
  } else {
    next();
  }
});

// Routes use
app.use('/authenticate', authenticateRoutes);
app.use('/profile', profileRoutes);
app.use('/users', user.routes);
app.use('/roles', role.routes);
app.use('/resources', resource.routes);
app.use('/resourcetypes', resourcetype.routes);
app.use('/layouts', layout.routes);
app.use('/fields', field.routes);
app.use('/fieldcategories', fieldcategory.routes);
app.use('/additionalfields', additionalfield.routes);
app.use('/filesystem', filesystemRoutes);
app.use('/mail', mailRoutes);
app.use('/systemsettings', systemsetting.routes);
app.use('/dictionaries', dictionary.routes);
app.use('/files', express.static('../files'));

async function connect() {
  const connect = await sequelize.sync();

  if (!connect) {
    console.log('Not connect!');
    return;
  }

  await createDir('../files');

  await role.init();

  await user.init();

  await systemsetting.init();

  await dictionary.init();

  await resourcetype.init();

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.SERVER_PORT}`);
  });
}

connect();
