const Sequelize = require('sequelize');
const sequelize = require('../../../../../core/db');

const Model = sequelize.define('OrderResource', {
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Model;
