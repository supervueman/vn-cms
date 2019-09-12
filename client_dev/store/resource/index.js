export default {
  state() {
    return {
      resources: {}
    }
  },
  mutations: {
    setAll(state, payload) {
      state.resources = payload;
    }
  },
  actions: {
    async findAll({
      commit
    }, payload) {
      const response = await this.$axios.$get('/resources');
      commit('setAll', response);
    }
  },
  getters: {
    getAll(state) {
      return state.resources;
    }
  },
  namespaced: true
};
