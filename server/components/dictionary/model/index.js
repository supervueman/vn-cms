const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('dictionary', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  lang: {
    type: Sequelize.STRING,
    notEmpty: true,
    unique: true,
  },
  title: Sequelize.STRING,
  value: Sequelize.TEXT,
});

module.exports = Model;
