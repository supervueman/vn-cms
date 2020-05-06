const mutations = {
  SET(state, payload) {
    state.lang = payload;
  },
  SET_ALL(state, payload) {
    state.langs = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.langs.push(payload);
  }
};

export default mutations;
