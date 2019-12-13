const Sequelize = require('sequelize');
const SequelizeTokenify = require('sequelize-tokenify');
const sequelize = require('../../../core/db');

const Model = sequelize.define('context', {
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
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

SequelizeTokenify.tokenify(Model);

module.exports = Model;
