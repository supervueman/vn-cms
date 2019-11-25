const Model = require('../model');
const User = require('../../../../user/model');
const Product = require('../../product/model');

module.exports = () => {
  Model.belongsTo(User, {
    as: 'owner'
  });

  Model.belongsToMany(Product, {
    as: 'products',
    through: 'CartProduct'
  });
};
