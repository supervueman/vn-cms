const Sequelize = require('sequelize');
require('dotenv').config();

const {
	db_name,
	db_user,
	db_password,
	db_dialect,
	db_host
} = require('../core.config');

console.log('db_name', db_name);
console.log('db_user', db_user);
console.log('db_password', db_password);
console.log('db_dialect', db_dialect);
console.log('db_host', db_host);

// Handlers
const operatorsAliases = require('./operators_aliases');

module.exports = new Sequelize(db_name, db_user, db_password, {
	dialect: db_dialect,
	host: db_host,
	operatorsAliases,
	// logging: true,
	logging: (...msg) => console.log(msg)
});
