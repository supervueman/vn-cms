const getters = {
  get(state) {
    return state.user;
  },
  getAll(state) {
    return state.users;
  },
  getCount(state) {
    return state.count;
  }
};

export default getters;
