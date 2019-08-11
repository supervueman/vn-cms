const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// Models
const User = require('../models/user');

const Resource = sequelize.define('resource', {
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
  content: Sequelize.STRING,
  published: Sequelize.BOOLEAN
});

Resource.belongsTo(User, {
  onDelete: 'cascade'
});

module.exports = Resource;
