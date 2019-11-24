const mutations = {
  SET(state, payload) {
    state.orderstatus = payload;
  },
  SET_ALL(state, payload) {
    state.orderstatuses = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.orderstatuses.push(payload);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
};

export default mutations;
