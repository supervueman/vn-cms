// const express = require('express');

const routes = require('./routes');
const init = require('./init');

// const app = express();

module.exports = routes;

module.exports = {
  routes,
  init
}

// module.exports = () => {
//   app.use('/system-settings', routes);
// }
