const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

const Model = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  order_num: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER
  },
  comment: {
    type: Sequelize.STRING(1000)
  },
  delivery_info: {
    type: Sequelize.TEXT
  }
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.owner) {
    delete values.owner.dataValues.password;
  }

  if (values.manager) {
    delete values.manager.dataValues.password;
  }

  if (values.courier) {
    delete values.courier.dataValues.password;
  }

  return values;
};

module.exports = Model;
