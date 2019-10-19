const routes = require('./routes');
const init = require('./init');

module.exports = {
  routes(app) {
    routes(app);
  },
  init(app) {
    init(app);
  }
}
