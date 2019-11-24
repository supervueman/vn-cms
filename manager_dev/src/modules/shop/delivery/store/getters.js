const getters = {
  get(state) {
    return state.delivery;
  },
  getAll(state) {
    return state.deliveries;
  },
  getCount(state) {
    return state.count;
  },
};

export default getters;
