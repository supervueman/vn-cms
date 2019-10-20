const getters = {
  get(state) {
    return state.dictionary;
  },
  getAll(state) {
    return state.dictionaries;
  },
  getCount(state) {
    return state.count;
  },
};

export default getters;
