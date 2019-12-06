const routes = require('./routes');
const init = require('./init');
const associations = require('./associations');

module.exports = {
  routes(app) {
    routes(app);
  },
  associations() {
    associations();
  },
  init(app) {
    init(app);
  }
};
