// Models
const AdditionalField = require('../models/additionalField');
const Field = require('../models/field');
const Layout = require('../models/layout');
const Resource = require('../models/resource');
const Role = require('../models/role');
const User = require('../models/user');

module.exports = () => {
  // User
  User.belongsTo(Role, {
    as: 'role'
  });
  User.belongsTo(User, {
    onDelete: 'cascade',
    as: 'user'
  });
  User.hasMany(Resource, {
    onDelete: 'cascade',
    as: 'resources'
  });

  // Layout
  Layout.belongsToMany(Field, {
    as: 'fields',
    through: 'LayoutField',
    constraints: false
  });

  // Filed
  Field.belongsToMany(Layout, {
    as: 'layouts',
    through: 'LayoutField',
    constraints: false
  });

  // Resource
  Resource.hasMany(AdditionalField, {
    as: 'additionalfields',
    onDelete: 'cascade'
  });
  Resource.belongsTo(User, {
    as: 'user',
    onDelete: 'cascade'
  });
  Resource.belongsTo(Resource, {
    onDelete: 'cascade',
    as: 'parent'
  });
  Resource.belongsTo(Layout, {
    as: 'layout'
  });

  // Additional field
  AdditionalField.belongsTo(Field, {
    onDelete: 'cascade'
  });
  AdditionalField.belongsTo(Resource, {
    onDelete: 'cascade'
  });








}
