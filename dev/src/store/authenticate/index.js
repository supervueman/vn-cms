export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async signin({
      commit
    }, payload) {
      this.dispatch('profile/setProfile', payload)
    },
    async logout({
      commit
    }) {
      this.dispatch('profile/clearProfile');
    }
  },
  getters: {}
};
