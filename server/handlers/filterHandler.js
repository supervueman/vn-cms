module.exports = (filterData) => {
  let filter = {};

  if (filterData) {
    filter = JSON.parse(filterData);
  }

  return filter;
}
