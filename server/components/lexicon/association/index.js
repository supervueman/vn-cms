const Model = require('../model');
const Lang = require('../../lang/model');

module.exports = () => {
  Model.belongsTo(Lang, {
    as: 'lang'
  });

  Lang.hasMany(Model, {
    as: 'lexicons'
  });
};
