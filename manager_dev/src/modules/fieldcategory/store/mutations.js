const mutations = {
  set(state, payload) {
    state.fieldCategory = payload;
  },
  setAll(state, payload) {
    state.fieldCategories = payload;
  },
  setCount(state, payload) {
    state.count = payload;
  }
};

export default mutations;
