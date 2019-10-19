const Sequelize = require('sequelize');
const sequelize = require('../../../util/database');

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
