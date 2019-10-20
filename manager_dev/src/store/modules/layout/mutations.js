const mutations = {
  set(state, payload) {
    state.layout = payload;
  },
  setAll(state, payload) {
    state.layouts = payload;
  },
  setCount(state, payload) {
    state.count = payload;
  }
};

export default mutations;
