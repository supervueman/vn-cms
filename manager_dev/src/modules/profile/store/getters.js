const getters = {
  get(state) {
    return state.profile;
  },
  getRules(state) {
    return state.rules;
  },
  getResources(state) {
    return state.resources;
  }
};

export default getters;
