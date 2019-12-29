const getters = {
  get(state) {
    return state.context;
  },
  getAll(state) {
    return state.contexts;
  },
  getCount(state) {
    return state.count;
  },
  getSidebarContexts(state) {
    return state.sidebarContexts;
  }
};

export default getters;
