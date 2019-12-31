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
        const dictionary = JSON.parse(response.value);
        const transformDictionary = {};

        for (const key in dictionary) {
          transformDictionary[key] = dictionary[key].text;
        }

        commit('SET', transformDictionary);
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
