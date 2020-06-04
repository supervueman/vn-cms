const getters = {
  get(state) {
    return state.productmodificator;
  },
  getAll(state) {
    return state.productmodificators;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
