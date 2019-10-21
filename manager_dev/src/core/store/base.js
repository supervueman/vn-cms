export default {
  state: {
    mainLang: 'en'
  },
  mutations: {
    SET_AMIN_LANG(state, payload) {
      state.mainLang = payload;
    },
  },
  actions: {
    setMainLang({
      commit
    }, payload) {
      commit('SET_AMIN_LANG', payload);
    }
  },
  getters: {
    getMainLang(state) {
      return state.mainLang;
    },
  },
  namespaced: true
};
