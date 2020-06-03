const getters = {
  get(state) {
    return state.lang;
  },
  getAll(state) {
    return state.langs;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
