const routes = require('./routes');
const init = require('./init');
const associations = require('./associations');
const swagger = require('./swagger');

module.exports = {
  routes(app) {
    routes(app);
  },
  associations() {
    associations();
  },
  init(app) {
    init(app);
  },
  swagger() {
    return swagger();
  }
};
