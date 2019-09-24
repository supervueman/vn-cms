const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
require('dotenv').config();

// Handlers
const createDir = require('./handlers/createDir');

// Routes
const authenticateRoutes = require('./routes/authenticate');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const resourceRoutes = require('./routes/resource');
const layoutRoutes = require('./routes/layout');
const fieldRoutes = require('./routes/field');
const additionalFieldRoutes = require('./routes/addittionalField');
const filesystemRoutes = require('./routes/filesystem');
const mailRoutes = require('./routes/mail');
const systemSettingRoutes = require('./routes/systemSetting');
const dictionaryRoutes = require('./routes/dictionary');

// Components init
const roleInit = require('./components/role');
const userInit = require('./components/user');
const systemSettingInit = require('./components/systemSetting');
const dictionariesInit = require('./components/dictionary');

// Association init
const associationInit = require('./associations');
associationInit();

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

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, x-api-key');

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
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/resources', resourceRoutes);
app.use('/layouts', layoutRoutes);
app.use('/fields', fieldRoutes);
app.use('/additionalfields', additionalFieldRoutes);
app.use('/filesystem', filesystemRoutes);
app.use('/mail', mailRoutes);
app.use('/system-settings', systemSettingRoutes);
app.use('/dictionaries', dictionaryRoutes);
app.use('/files', express.static('../files'));

async function connect() {
  const connect = await sequelize.sync();

  if (!connect) {
    console.log('Not connect!');
    return;
  }

  await roleInit();

  await createDir('../files');

  await userInit();

  await systemSettingInit();

  await dictionariesInit();

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.SERVER_PORT}`);
  });
}

connect();
