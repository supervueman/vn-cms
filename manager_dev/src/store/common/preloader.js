export default {
  state: {
    preloader: false
  },
  mutations: {
    set(state, payload) {
      state.preloader = payload;
    },
  },
  actions: {
    fetch({
      commit
    }, payload) {
      commit('set', payload);
    },
  },
  getters: {
    get(state) {
      return state.preloader;
    },
  },
  namespaced: true
};
