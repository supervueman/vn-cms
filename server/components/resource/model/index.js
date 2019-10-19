const Sequelize = require('sequelize');
const sequelize = require('../../../util/database');

const Model = sequelize.define('resource', {
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
}

module.exports = Model;
