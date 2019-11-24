const Model = require('../model');
const ProductField = require('../../productfield/model');
const Layout = require('../../../../layout/model');
const ResourceType = require('../../../../resourcetype/model');
const User = require('../../../../user/model');

module.exports = () => {
  Model.hasMany(ProductField, {
    as: 'productfields',
    onDelete: 'cascade',
    foreignKey: 'productId'
  });
  Model.belongsTo(User, {
    as: 'user',
    onDelete: 'cascade'
  });
  Model.belongsTo(Model, {
    onDelete: 'cascade',
    as: 'parent'
  });
  Model.belongsTo(Layout, {
    as: 'layout'
  });
  Model.belongsTo(ResourceType, {
    as: 'resourcetype'
  });
  Model.belongsToMany(Model, {
    as: 'translations',
    onDelete: 'cascade',
    through: 'ProductTranslation',
    constraints: false
  });
  Model.hasMany(Model, {
    as: 'children',
    onDelete: 'cascade',
    foreignKey: 'parentId'
  });
};
