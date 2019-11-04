const mutations = {
  SET_LAYOUT(state, payload) {
    state.layout = payload;
  },
  SET_COMPONENT(state, payload) {
    state.component = payload;
  },
  SET_PAGE(state, payload) {
    state.page = payload;
  }
};

export default mutations;
