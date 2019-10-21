const mutations = {
  SET(state, payload) {
    state.user = payload;
  },
  SET_ALL(state, payload) {
    state.users = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
}

export default mutations;
