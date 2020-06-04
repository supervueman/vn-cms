const getters = {
  get(state) {
    return state.order;
  },
  getAll(state) {
    return state.orders;
  },
  getCount(state) {
    return state.count;
  },
  getCouriers(state) {
    return state.couriers;
  },
  getManagers(state) {
    return state.managers;
  }
};

export default getters;
