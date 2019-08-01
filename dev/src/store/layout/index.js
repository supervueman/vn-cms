import layout from '@/fakers/layout';
import defaultLayout from '@/models/layout';

export default {
  namespaced: true,
  state: {
    layout: defaultLayout,
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
      commit('set', defaultLayout);
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
