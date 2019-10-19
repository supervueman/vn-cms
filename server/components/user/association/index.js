const Model = require('../model');
const Resource = require('../../resource/model');
const Role = require('../../role/model');

module.exports = async () => {
  Model.belongsTo(Role, {
    as: 'role'
  });
  Model.belongsTo(Model, {
    onDelete: 'cascade',
    as: 'user'
  });
  Model.hasMany(Resource, {
    onDelete: 'cascade',
    as: 'resources'
  });
}
