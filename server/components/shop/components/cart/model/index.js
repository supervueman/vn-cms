const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

const Model = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  price: {
    type: Sequelize.INTEGER,
  },
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.owner) {
    delete values.owner.dataValues.password;
  }

  if (values.manager) {
    delete values.manager.dataValues.password;
  }

  return values;
}

module.exports = Model;
