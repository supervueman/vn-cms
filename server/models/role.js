const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true
  },
  title: Sequelize.STRING,
  rang: Sequelize.INTEGER
});

module.exports = Role;
