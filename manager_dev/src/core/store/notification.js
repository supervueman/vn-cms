export default {
  state: {
    notification: {
      isActive: false,
      type: 'success',
      message: 'Success'
    },
  },
  mutations: {
    set(state, payload) {
      state.notification = payload;
    },
  },
  actions: {
    fetch({
      commit
    }, payload) {
      commit('set', payload);
      const closeNotification = {
        isActive: false
      };
      setTimeout(() => {
        commit('set', closeNotification)
      }, 3000);
    },
  },
  getters: {
    get(state) {
      return state.notification;
    },
  },
  namespaced: true
};
