const getters = {
  get(state) {
    return state.fieldCategory;
  },
  getAll(state) {
    return state.fieldCategories;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
