const mutations = {
  SET(state, payload) {
    state.pushNotification = payload;
  },
  SET_ALL(state, payload) {
    state.pushNotification = payload;
  }
};

export default mutations;
