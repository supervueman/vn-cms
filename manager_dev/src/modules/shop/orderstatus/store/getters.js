const getters = {
  get(state) {
    return state.orderstatus;
  },
  getAll(state) {
    return state.orderstatuses;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
