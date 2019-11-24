const Model = require('../model');
const Field = require('../../../../field/model');
const FieldCategory = require('../../../../fieldcategory/model');
const Product = require('../../product/model');

module.exports = () => {
  Model.belongsTo(Field, {
    onDelete: 'cascade'
  });
  Model.belongsTo(Product, {
    onDelete: 'cascade'
  });
  Model.belongsTo(FieldCategory, {
    as: 'category'
  });
};
