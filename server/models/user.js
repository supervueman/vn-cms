const Sequelize = require('sequelize');
const SequelizeTokenify = require('sequelize-tokenify');
const sequelize = require('../util/database');

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
    isEmail: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    notEmpty: false
  },
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
    // unique: true
  },
});

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

SequelizeTokenify.tokenify(User);

module.exports = User;
