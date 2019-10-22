const getters = {
  get(state) {
    return state.field;
  },
  getAll(state) {
    return state.fields;
  },
  getCount(state) {
    return state.count;
  },
  getLayouts(state) {
    return state.layouts;
  },
  getTypes(state) {
    return state.types;
  }
};

export default getters;
