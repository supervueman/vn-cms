const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Resource = sequelize.define('resource', {
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
  level: Sequelize.INTEGER
});

Resource.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  if (values.user) {
    delete values.user.dataValues.password;
  }

  return values;
}

module.exports = Resource;
