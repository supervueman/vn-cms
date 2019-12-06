// Models
const Layout = require('../model');
const Field = require('../../field/model');

module.exports = () => {
  Layout.belongsToMany(Field, {
    as: 'fields',
    through: 'LayoutField',
    constraints: false
  });
};
