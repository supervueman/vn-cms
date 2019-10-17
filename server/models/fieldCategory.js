const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const FieldCategory = sequelize.define('fieldCategory', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    unique: true,
    notEmpty: true,
    allowNull: false
  }
});

module.exports = FieldCategory;
