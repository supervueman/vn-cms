const Model = require('../model');
const Field = require('../../field/model');
const FieldCategory = require('../../fieldcategory/model');
const Resource = require('../../resource/model');

module.exports = () => {
  Model.belongsTo(Field, {
    onDelete: 'cascade'
  });
  Model.belongsTo(Resource, {
    onDelete: 'cascade'
  });
  Model.belongsTo(FieldCategory, {
    as: 'category'
  });
}
