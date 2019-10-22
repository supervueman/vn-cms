export default {
  state: {
    mainLang: 'en'
  },
  mutations: {
    SET_ADMIN_LANG(state, payload) {
      state.mainLang = payload;
    },
  },
  actions: {
    setMainLang({
      commit
    }, payload) {
      commit('SET_ADMIN_LANG', payload);
    }
  },
  getters: {
    getMainLang(state) {
      return state.mainLang;
    },
  },
  namespaced: true
};
