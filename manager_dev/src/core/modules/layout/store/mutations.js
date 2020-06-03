const mutations = {
  SET(state, payload) {
    state.layout = payload;
  },
  SET_ALL(state, payload) {
    state.layouts = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
