const Sequelize = require('sequelize');
const sequelize = require('../../../util/database');

const SystemSetting = sequelize.define('systemsetting', {
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
  setting: Sequelize.STRING(1234),
  component: Sequelize.STRING,
  settingType: Sequelize.STRING
});

module.exports = SystemSetting;
