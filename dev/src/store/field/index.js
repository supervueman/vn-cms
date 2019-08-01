import defaultField from '@/models/field';
import field from '@/fakers/field';

export default {
  namespaced: true,
  state: {
    field: defaultField,
    fields: [],
    types: ['text', 'textarea', 'editor', 'image', 'select', 'migx', 'radio', 'date', 'time', 'colorpicker', 'checkbox']
  },
  mutations: {
    set(state, payload) {
      state.field = payload;
    },
    setAll(state, payload) {
      state.fields = payload;
    }
  },
  actions: {
    async fetch({
      commit
    }, payload) {
      await setTimeout(() => {
        commit('set', field);
      }, 1500);
    },

    async create({
      commit
    }, payload) {
      await setTimeout(() => {
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
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
          message: 'Успешно сохранено!',
          isActive: true
        });
      }, 1500);
    },

    async remove({
      commit
    }, payload) {
      await setTimeout(() => {
        this.dispatch('field/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно удалено!',
          isActive: true
        });
      }, 1500);
    },

    async fetchAll({
      commit
    }, payload) {
      await setTimeout(() => {
        commit('setAll', [field]);
      }, 1500);
    },

    set({
      commit
    }, payload) {
      commit('set', field);
    },

    clear({
      commit
    }) {
      commit('set', defaultField);
    }
  },
  getters: {
    get(state) {
      return state.field;
    },
    getAll(state) {
      return state.fields;
    },
    getTypes(state) {
      return state.types;
    }
  }
};
