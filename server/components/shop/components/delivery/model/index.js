const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

const Model = sequelize.define('delivery', {
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
  title: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cost: {
    type: Sequelize.INTEGER
  },
  country: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  district: {
    type: Sequelize.STRING
  },
  street: {
    type: Sequelize.STRING
  },
  house: {
    type: Sequelize.STRING
  },
  apartment: {
    type: Sequelize.STRING
  },
  fullAddress: {
    type: Sequelize.STRING
  }
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.manager) {
    delete values.manager.dataValues.password;
  }

  return values;
};

module.exports = Model;
