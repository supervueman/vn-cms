const routes = require('./routes');
const init = require('./init');
require('./association')();

module.exports = {
  routes,
  init
};
