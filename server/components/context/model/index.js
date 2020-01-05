const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('context', {
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
  title: {
    type: Sequelize.STRING
  }
});

module.exports = Model;
