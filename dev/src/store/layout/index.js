import defaultLayout from '@/models/layout';

const layout = {
  slug: '',
  title: '',
}

export default {
  namespaced: true,
  state: {
    layout: {
      ...layout
    },
    layouts: []
  },
  mutations: {
    set(state, payload) {
      state.layout = payload;
    },
    setAll(state, payload) {
      state.layouts = payload;
    }
  },
  actions: {
    async fetch({
      commit
    }, payload) {
      await setTimeout(() => {
        commit('set', layout);
      }, 1500);
    },

    async create({
      commit
    }, payload) {
      await setTimeout(() => {
        commit('set', payload);
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      }, 1500);
    },

    async update({
      commit
    }, payload) {
      await setTimeout(() => {
        commit('set', payload);
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      }, 1500);
    },

    async remove({
      commit
    }, payload) {
      await setTimeout(() => {
        this.dispatch('layout/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно удалено!`,
          isActive: true
        });
      }, 1500);
    },

    async fetchAll({
      commit
    }, payload) {
      await setTimeout(() => {
        commit('setAll', [layout]);
      }, 1500);
    },

    set({
      commit
    }, payload) {
      commit('set', layout);
    },

    clear({
      commit
    }) {
      commit('set', {
        ...layout
      });
    }
  },
  getters: {
    get(state) {
      return state.layout;
    },
    getAll(state) {
      return state.layouts;
    }
  }
};
