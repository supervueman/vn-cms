export default {
  state: () => ({
    notification: {
      isActive: false,
      type: 'success',
      text: 'Success'
    }
  }),

  mutations: {
    SET(state, payload) {
      state.notification = payload;
    }
  },

  actions: {
    fetch({
      commit
    }, payload) {
      commit('SET', payload);
      const closeNotification = {
        isActive: false
      };
      setTimeout(() => {
        commit('SET', closeNotification);
      }, 3000);
    }
  },

  getters: {
    notification(state) {
      return state.notification;
    }
  },

  namespaced: true
};
