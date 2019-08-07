// Handlers
const modelsAliases = require('../handlers/modelsAliases');

module.exports = (filterData) => {
  let filter = {};

  if (filterData) {
    filter = JSON.parse(filterData);
    if (filter.include) {
      filter.include = filter.include.map(el => {
        el.model = modelsAliases[el.model];
        return el;
      });
    }
  }

  return filter;
}
