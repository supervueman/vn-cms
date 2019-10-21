const mutations = {
  set(state, payload) {
    state.field = payload;
  },
  setAll(state, payload) {
    state.fields = payload;
  },
  setCount(state, payload) {
    state.count = payload;
  },
  setLayouts(state, payload) {
    state.layouts = payload;
  }
};

export default mutations;
