const Model = require('../model');
const AdditionalField = require('../../additionalfield/model');
const Layout = require('../../layout/model');
const ResourceType = require('../../resourcetype/model');
const Context = require('../../context/model');

module.exports = () => {
  Model.hasMany(AdditionalField, {
    as: 'additionalfields',
    onDelete: 'cascade'
  });

  Model.belongsTo(Context, {
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
    through: 'ResourceTranslation',
    constraints: false
  });

  Model.hasMany(Model, {
    as: 'children',
    onDelete: 'cascade',
    foreignKey: 'parentId'
  });
};
