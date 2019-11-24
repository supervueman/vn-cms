const Model = require('../model');
const User = require('../../../../user/model');

module.exports = () => {
  Model.belongsTo(User, {
    as: 'manager'
  });
};
