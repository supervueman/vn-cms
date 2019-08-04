import profile from '@/fakers/admin';
import defaultProfile from '@/models/profile';
import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    profile: defaultProfile,
  },
  mutations: {
    set(state, payload) {
      state.profile = payload;
    }
  },
  actions: {
    async fetch({
      commit
    }) {
      const data = requestDataHandler('GET', '/profile/fetch');

      const result = await axios(data);

      if (result !== undefined) {
        commit('set', result.data);
      }
    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/profile/create', payload);

      const result = await axios(data);

      if (result !== undefined) {
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      } else {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `Ошибка при создании!`,
          isActive: true
        });
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/profile/update', payload);

      const result = await axios(data);

      console.log(result)

      if (result !== undefined) {
        this.dispatch('profile/set', result.data);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      } else {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Произошла ошибка при сохранении!',
          isActive: true
        });
      }
    },

    async remove({
      commit
    }, payload) {
      await setTimeout(() => {
        if (this.getters['profile/get'].id === payload) {
          this.dispatch('profile/clear');
        } else {
          this.dispatch('user/clear');
        }
      }, 1500);
    },

    set({
      commit
    }, payload) {
      commit('set', payload);
    },

    clear({
      commit
    }) {
      commit('set', defaultProfile)
    }
  },
  getters: {
    get(state) {
      return state.profile;
    },
  }
};
