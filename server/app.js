const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Routes
const authenticateRoutes = require('./routes/authenticate');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');
const resourceRoutes = require('./routes/resource');
const layoutRoutes = require('./routes/layout');
const fieldRoutes = require('./routes/field');
const additionalFieldRoutes = require('./routes/addittionalField');

// Models
const User = require('./models/user');
const Role = require('./models/role');
const Layout = require('./models/layout');
const Field = require('./models/field');

// Association
Layout.belongsToMany(Field, {
  through: 'LayoutField',
  constraints: false
});

Field.belongsToMany(Layout, {
  through: 'LayoutField',
  constraints: false
});



const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ACCESS_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, x-api-key');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  if (req.headers.authorization === `Basic ${new Buffer(process.env.AUTHORIZATION_LOGIN + ':' + process.env.AUTHORIZATION_PASSWORD).toString('base64')}`) {
    next();
  } else {
    res.status(401).send({
      message: 'Not authorization!'
    });
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

async function connect() {
  const connect = await sequelize.sync();

  if (!connect) {
    res.status(500);
  }

  let adminRole = await Role.findOne({
    where: {
      slug: process.env.ADMIN_SLUG
    }
  });

  if (!adminRole) {
    adminRole = await Role.create({
      slug: 'admin',
      title: 'Администратор',
      rang: 9999
    });
  }

  let admin = await User.findOne({
    where: {
      slug: process.env.ADMIN_SLUG
    }
  });

  if (!admin) {
    let passwordHw = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    admin = await User.create({
      slug: process.env.ADMIN_SLUG,
      email: process.env.ADMIN_EMAIL,
      password: passwordHw,
      roleId: adminRole.id
    });
    res.status(200).send('Admin is created!');
  }

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listen on http://localhost:${process.env.SERVER_PORT}`);
  });
}

connect();
