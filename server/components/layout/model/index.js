const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('layout', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true,
    unique: true,
  },
  title: Sequelize.STRING,
});

module.exports = Model;
