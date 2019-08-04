const Sequelize = require('sequelize');
const SequelizeTokenify = require('sequelize-tokenify');
const sequelize = require('../util/database');

// Models
const Role = require('./role');

const User = sequelize.define('user', {
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
  email: {
    type: Sequelize.STRING,
    unique: true,
    isEmail: true,
    notEmpty: true
  },
  phone: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  middlename: Sequelize.STRING,
  image: Sequelize.STRING,
  facebook: Sequelize.STRING,
  vkontakte: Sequelize.STRING,
  instagram: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  token: {
    type: Sequelize.STRING,
    unique: true
  },
});

SequelizeTokenify.tokenify(User);

User.belongsTo(Role);

module.exports = User;
