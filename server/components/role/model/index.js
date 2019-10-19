const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('role', {
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
  rules: Sequelize.TEXT
});

module.exports = Model;
