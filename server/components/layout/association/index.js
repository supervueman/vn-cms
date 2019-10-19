// Models
const Layout = require('../model');
const Field = require('../../../models/field');

module.exports = async () => {
  Layout.belongsToMany(Field, {
    as: 'fields',
    through: 'LayoutField',
    constraints: false
  });
}
