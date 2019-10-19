const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('field', {
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
  fieldType: Sequelize.STRING,
  schema: Sequelize.TEXT,
  defaultValue: Sequelize.TEXT
});

module.exports = Model;
