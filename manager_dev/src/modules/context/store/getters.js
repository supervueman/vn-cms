const getters = {
  get(state) {
    return state.context;
  },
  getAll(state) {
    return state.contexts;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
