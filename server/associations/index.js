// Models
const Resource = require('../components/resource/model');
const Role = require('../components/role/model');
const User = require('../models/user');

module.exports = async () => {
  // User.belongsTo(Role, {
  //   as: 'role'
  // });
  // User.belongsTo(User, {
  //   onDelete: 'cascade',
  //   as: 'user'
  // });
  // User.hasMany(Resource, {
  //   onDelete: 'cascade',
  //   as: 'resources'
  // });
}
