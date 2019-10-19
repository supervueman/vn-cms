const express = require('express');
const sequelize = require('./core/db');
require('dotenv').config();

// Routes
const authenticate = require('./components/authenticate');
const profile = require('./components/profile');
const user = require('./components/user');
const role = require('./components/role');
const resource = require('./components/resource');
const resourcetype = require('./components/resourcetype');
const layout = require('./components/layout');
const field = require('./components/field');
const fieldcategory = require('./components/fieldcategory');
const additionalfield = require('./components/additionalfield');
const systemsetting = require('./components/systemsetting');
const dictionary = require('./components/dictionary');
const mailRoutes = require('./routes/mail');
const filesystem = require('./core/components/filesystem');

const app = express();
const init = require('./core');
init(app);

// Routes use
app.use('/authenticate', authenticate.routes);
app.use('/profile', profile.routes);
app.use('/users', user.routes);
app.use('/roles', role.routes);
app.use('/resources', resource.routes);
app.use('/resourcetypes', resourcetype.routes);
app.use('/layouts', layout.routes);
app.use('/fields', field.routes);
app.use('/fieldcategories', fieldcategory.routes);
app.use('/additionalfields', additionalfield.routes);
app.use('/systemsettings', systemsetting.routes);
app.use('/dictionaries', dictionary.routes);
app.use('/mail', mailRoutes);
app.use('/filesystem', filesystem.routes);

async function connect() {
  const connect = await sequelize.sync();

  if (!connect) {
    console.log('Not connect!');
    return;
  }

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
