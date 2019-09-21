import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    systemSettings: [],
    count: 0
  },
  mutations: {
    setAll(state, payload) {
      state.systemSettings = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    async update({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('PUT', '/system-settings/update', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },


    async findAll({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/system-settings', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });
      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('setAll', response.data);
      }
    },

    async count({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/system-settings/count', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('setCount', response.data.count);
      }
    },

    clearAll({
      commit
    }) {
      commit('setAll', []);
    },
  },
  getters: {
    getAll(state) {
      return state.systemSettings;
    },
    getCount(state) {
      return state.count;
    }
  }
};