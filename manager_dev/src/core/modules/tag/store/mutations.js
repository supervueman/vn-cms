const mutations = {
  SET(state, payload) {
    state.tag = payload;
  },
  SET_ALL(state, payload) {
    state.tags = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
