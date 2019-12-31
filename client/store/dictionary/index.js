export default {
  state: () => {
    return {
      dictionary: {}
    };
  },

  mutations: {
    SET(state, payload) {
      state.dictionary = payload;
    }
  },

  actions: {
    async findOne({
      commit
    }, payload) {
      const response = await this.$axios.$get('/dictionaries/findone', payload).catch(err => {
        console.log(err);
      });

      if (response) {
        commit('SET', JSON.parse(response.value));
      }
    }
  },

  getters: {
    dictionary(state) {
      return state.dictionary;
    }
  },

  namespaced: true
};
