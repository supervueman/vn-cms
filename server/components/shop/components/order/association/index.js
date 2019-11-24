const Model = require('../model');
const User = require('../../../../user/model');
const Resource = require('../../../../resource/model');
const OrderStatus = require('../../orderstatus/model');
const OrderResource = require('../model/OrderResource');
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

  Model.belongsToMany(Resource, {
    as: 'products',
    through: OrderResource
  });

  Model.belongsTo(OrderStatus, {
    as: 'orderstatus'
  });

  Model.belongsTo(Delivery, {
    as: 'delivery'
  });
};
