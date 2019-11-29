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
  }
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.manager) {
    delete values.manager.dataValues.password;
  }

  return values;
}

module.exports = Model;
