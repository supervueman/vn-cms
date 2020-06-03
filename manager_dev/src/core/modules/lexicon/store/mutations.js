const mutations = {
  SET(state, payload) {
    state.lexicon = payload;
  },
  SET_ALL(state, payload) {
    state.lexicons = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
