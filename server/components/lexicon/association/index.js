const Model = require('../model');
const Lang = require('../../lang/model');

module.exports = () => {
  Lang.hasMany(Model, {
    onDelete: 'CASCADE',
    hooks: true
  });

  Model.belongsTo(Lang);
};
