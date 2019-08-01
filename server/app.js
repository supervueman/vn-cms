const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
require('dotenv').config();

// Routes
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use('/profile', profileRoutes);
app.use('/user', userRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server listen on http://localhost:${process.env.SERVER_PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
