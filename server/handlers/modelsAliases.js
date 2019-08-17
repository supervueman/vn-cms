const Role = require('../models/role');
const User = require('../models/user');
const Resource = require('../models/resource');

module.exports = {
  $role: Role,
  $user: User,
  $resource: Resource
};
