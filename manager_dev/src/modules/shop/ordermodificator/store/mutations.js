const mutations = {
  SET(state, payload) {
    state.ordermodificator = payload;
  },
  SET_ALL(state, payload) {
    state.ordermodificators = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.ordermodificators.push(payload);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
