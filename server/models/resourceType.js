const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ResourceType = sequelize.define('resourceType', {
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

module.exports = ResourceType;
