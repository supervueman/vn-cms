const mutations = {
  SET(state, payload) {
    state.delivery = payload;
  },
  SET_ALL(state, payload) {
    state.deliveries = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.deliveries.push(payload);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
};

export default mutations;
