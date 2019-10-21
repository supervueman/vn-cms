export default {
  state: {
    preloader: false
  },
  mutations: {
    SET(state, payload) {
      state.preloader = payload;
    },
  },
  actions: {
    fetch({
      commit
    }, payload) {
      commit('SET', payload);
    },
  },
  getters: {
    get(state) {
      return state.preloader;
    },
  },
  namespaced: true
};
