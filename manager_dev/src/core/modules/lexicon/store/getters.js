const getters = {
  get(state) {
    return state.lexicon;
  },
  getAll(state) {
    return state.lexicons;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
