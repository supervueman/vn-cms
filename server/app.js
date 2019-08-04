const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Routes
const authenticateRoute = require('./routes/authenticate');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const roleRoutes = require('./routes/role');

// Models
const User = require('./models/user');
const Role = require('./models/role');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');

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
app.use('/authenticate', authenticateRoute);
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);
app.use('/roles', roleRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return Role.findByPk(1);
  })
  .then(role => {
    if (!role) {
      return Role.create({
        slug: 'admin',
        title: 'Администратор',
        rang: 9999
      })
    }
    return role;
  })
  .then(role => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      Role.findByPk(1).then(role => {
        bcrypt.hash(process.env.ADMIN_PASSWORD, 12).then(password => {
          return User.create({
            slug: process.env.ADMIN_SLUG,
            email: process.env.ADMIN_EMAIL,
            password,
            roleId: role.id
          });
        });
      })
    }
    return user;
  })
  .then(user => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server listen on http://localhost:${process.env.SERVER_PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
