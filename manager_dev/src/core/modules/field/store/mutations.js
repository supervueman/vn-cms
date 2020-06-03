const mutations = {
  SET(state, payload) {
    state.field = payload;
  },
  SET_ALL(state, payload) {
    state.fields = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_LAYOUTS(state, payload) {
    state.layouts = payload;
  }
};

export default mutations;
