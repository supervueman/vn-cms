const Sequelize = require('sequelize');
require('dotenv').config();

const {
  db_name,
  db_user,
  db_password,
  db_dialect,
  db_host,
  db_port
} = require('../core.config');

// Handlers
const operatorsAliases = require('./operators_aliases');

module.exports = new Sequelize(db_name, db_user, db_password, {
  dialect: db_dialect,
  host: db_host,
  port: db_port,
  operatorsAliases,
  logging: false // process.env.NODE_ENV === 'development' ? true : false,
});
