const Role = require('../models/role');
const User = require('../models/user');
const Resource = require('../models/resource');
const Layout = require('../models/layout');
const Field = require('../models/field');
const AdditionalField = require('../models/additionalField');

module.exports = {
  $role: Role,
  $user: User,
  $resource: Resource,
  $layout: Layout,
  $field: Field,
  $additionalfield: AdditionalField
};
