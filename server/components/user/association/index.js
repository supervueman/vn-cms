const Model = require('../model');
const Resource = require('../../resource/model');
const Role = require('../../role/model');
const Context = require('../../context/model');

module.exports = () => {
  // Каждый пользователь имеет роль
  Model.belongsTo(Role, {
    as: 'role'
  });

  // У каждого пользователя может быть множество ресурсов
  Model.hasMany(Resource, {
    as: 'resources',
    onDelete: 'cascade'
  });

  // Каждый пользователь относится к контексту
  Model.belongsTo(Context, {
    as: 'context',
    onDelete: 'cascade'
  });
};
