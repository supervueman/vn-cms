const mutations = {
  SET(state, payload) {
    state.smsc = payload;
  },
  SET_BALANCE(state, payload) {
    state.balance = payload;
  },
  SET_PHONES(state, payload) {
    state.phones = payload;
  }
};

export default mutations;
