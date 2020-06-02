const Model = require('../model');
const Role = require('../../role/model');
const Context = require('../../context/model');

module.exports = () => {
  // Каждый пользователь имеет роль
  Model.belongsTo(Role, {
    as: 'role'
  });

  // Каждый пользователь относится к контексту
  Model.belongsTo(Context, {
    as: 'context',
    onDelete: 'cascade'
  });
};
