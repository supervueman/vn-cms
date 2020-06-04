const mutations = {
  SET(state, payload) {
    state.productmodificator = payload;
  },
  SET_ALL(state, payload) {
    state.productmodificators = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.productmodificators.push(payload);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
