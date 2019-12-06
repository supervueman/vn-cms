const Model = require('../model');
const FieldCategory = require('../../fieldcategory/model');
const Layout = require('../../layout/model');

module.exports = () => {
  Model.belongsToMany(Layout, {
    as: 'layouts',
    through: 'LayoutField',
    constraints: false
  });
  Model.belongsTo(FieldCategory, {
    as: 'category'
  });
};
