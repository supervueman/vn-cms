const getters = {
  get(state) {
    return state.role;
  },
  getAll(state) {
    return state.roles;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
