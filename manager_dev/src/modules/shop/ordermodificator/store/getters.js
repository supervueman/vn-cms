const getters = {
  get(state) {
    return state.ordermodificator;
  },
  getAll(state) {
    return state.ordermodificators;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
