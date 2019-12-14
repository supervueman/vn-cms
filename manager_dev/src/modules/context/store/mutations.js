const mutations = {
  SET(state, payload) {
    state.context = payload;
  },
  SET_ALL(state, payload) {
    state.contexts = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
