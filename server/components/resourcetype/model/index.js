const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('resourcetype', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  title: Sequelize.STRING
});

module.exports = Model;
