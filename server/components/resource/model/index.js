const Sequelize = require('sequelize');
const sequelize = require('../../../core/db');

const Model = sequelize.define('resource', {
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
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  content: Sequelize.TEXT,
  published: Sequelize.BOOLEAN,
  level: Sequelize.INTEGER,
  lang: Sequelize.STRING,
  menuindex: Sequelize.INTEGER
});

module.exports = Model;
