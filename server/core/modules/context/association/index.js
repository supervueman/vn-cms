const Model = require('../model');
const Resource = require('../../resource/model');

module.exports = () => {
  Model.hasMany(Resource, {
    as: 'resources',
    onDelete: 'cascade',
    foreignKey: 'contextId'
  });
};
