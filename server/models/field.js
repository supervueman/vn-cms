const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// Models
const Layout = require('./layout');

const Field = sequelize.define('field', {
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
  schema: Sequelize.STRING,
  defaultValue: Sequelize.STRING
});

Layout.belongsToMany(Field, {
  through: 'LayoutField',
  constraints: false
});

Field.belongsToMany(Layout, {
  through: 'LayoutField',
  constraints: false
});


module.exports = Field;
