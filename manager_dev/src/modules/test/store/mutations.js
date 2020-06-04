const mutations = {
  SET(state, payload) {
    state.test = payload;
  },
  SET_ALL(state, payload) {
    state.tests = payload;
  }
};

export default mutations;
