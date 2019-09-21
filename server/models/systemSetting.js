const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const SystemSetting = sequelize.define('systemSetting', {
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
  title: Sequelize.STRING,
  value: Sequelize.BOOLEAN
});

module.exports = SystemSetting;
