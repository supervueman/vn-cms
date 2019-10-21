const mutations = {
  set(state, payload) {
    state.user = payload;
  },
  setAll(state, payload) {
    state.users = payload;
  },
  setCount(state, payload) {
    state.count = payload;
  }
}

export default mutations;
