// Models
const Layout = require('../model');
const Field = require('../../field/model');

module.exports = async () => {
  Layout.belongsToMany(Field, {
    as: 'fields',
    through: 'LayoutField',
    constraints: false
  });
}
