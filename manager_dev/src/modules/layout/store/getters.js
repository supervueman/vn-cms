const getters = {
  get(state) {
    return state.layout;
  },
  getAll(state) {
    return state.layouts;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
