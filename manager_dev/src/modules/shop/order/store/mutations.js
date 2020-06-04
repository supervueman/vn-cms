const mutations = {
  SET(state, payload) {
    state.order = payload;
  },
  SET_ALL(state, payload) {
    state.orders = payload;
  },
  PUSH_TO_ALL(state, payload) {
    state.orders.push(payload);
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  },
  SET_COURIERS(state, payload) {
    state.couriers = payload;
  },
  SET_MANAGERS(state, payload) {
    state.managers = payload;
  }
};

export default mutations;
