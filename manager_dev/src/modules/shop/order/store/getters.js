const getters = {
  get(state) {
    return state.order;
  },
  getAll(state) {
    return state.orders;
  },
  getCount(state) {
    return state.count;
  },
};

export default getters;
