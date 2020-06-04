const getters = {
  get(state) {
    return state.smsc;
  },
  getBalance(state) {
    return state.balance;
  },
  getPhones(state) {
    return state.phones;
  }
};

export default getters;
