const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const AdditionalField = sequelize.define('additionalfield', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true,
  },
  value: Sequelize.TEXT
});

module.exports = AdditionalField;
