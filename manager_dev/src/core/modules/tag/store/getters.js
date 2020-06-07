const getters = {
  get(state) {
    return state.tag;
  },
  getAll(state) {
    return state.tags;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
