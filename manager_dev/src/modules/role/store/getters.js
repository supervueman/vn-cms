const getters = {
  get(state) {
    return state.role;
  },
  getAll(state) {
    return state.roles;
  },
  getCount(state) {
    return state.count;
  },
  getDefaultRules(state) {
    return state.defaultRules;
  }
};

export default getters;
