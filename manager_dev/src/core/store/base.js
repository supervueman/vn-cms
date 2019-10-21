export default {
  state: {
    mainLang: 'en'
  },
  mutations: {
    setMainLang(state, payload) {
      state.mainLang = payload;
    },
  },
  actions: {
    setMainLang({
      commit
    }, payload) {
      commit('setMainLang', payload);
    }
  },
  getters: {
    getMainLang(state) {
      return state.mainLang;
    },
  },
  namespaced: true
};
