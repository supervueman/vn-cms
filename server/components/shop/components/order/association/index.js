const Model = require('../model');
const User = require('../../../../user/model');
const Product = require('../../product/model');
const OrderStatus = require('../../orderstatus/model');
const OrderProduct = require('../model/OrderProduct');
const Delivery = require('../../delivery/model');

module.exports = () => {
  Model.belongsTo(User, {
    as: 'owner'
  });

  Model.belongsTo(User, {
    as: 'manager'
  });

  Model.belongsTo(User, {
    as: 'courier'
  });

  Model.belongsToMany(Product, {
    as: 'products',
    through: OrderProduct
  });

  Model.belongsTo(OrderStatus, {
    as: 'orderstatus'
  });

  Model.belongsTo(Delivery, {
    as: 'delivery'
  });
};
