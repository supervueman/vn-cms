const Model = require('../model');
const User = require('../../../../user/model');
const Resource = require('../../../../resource/model');

module.exports = () => {
  Model.belongsTo(User, {
    as: 'owner'
  });

  Model.belongsTo(User, {
    as: 'manager'
  });


  Model.belongsToMany(Resource, {
    as: 'products',
    through: 'CartResource'
  });
}
