const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

const Model = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  slug: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  content: Sequelize.TEXT,
  price: Sequelize.INTEGER,
  popular: Sequelize.BOOLEAN,
  new: Sequelize.BOOLEAN,
  published: Sequelize.BOOLEAN,
  level: Sequelize.INTEGER,
  lang: Sequelize.STRING,
  menuindex: Sequelize.INTEGER
});

Model.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.user) {
    delete values.user.dataValues.password;
  }

  return values;
};

module.exports = Model;
