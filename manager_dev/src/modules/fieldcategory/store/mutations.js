const mutations = {
  SET(state, payload) {
    state.fieldCategory = payload;
  },
  SET_ALL(state, payload) {
    state.fieldCategories = payload;
  },
  SET_COUNT(state, payload) {
    state.count = payload;
  }
};

export default mutations;
