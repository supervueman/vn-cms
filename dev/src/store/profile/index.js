import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

import profile from '@/models/user';

export default {
  namespaced: true,
  state: {
    profile: {
      ...profile
    },
    resources: []
  },
  mutations: {
    set(state, payload) {
      state.profile = payload;
    },

    setResources(state, payload) {
      state.resources = payload;
    }
  },
  actions: {
    async findByAccessToken({
      commit
    }) {
      const data = requestDataHandler('GET', '/profile');

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
        router.push('/');
      });

      if (response !== undefined && response.status === 200) {
        localStorage.setItem('x-api-key', response.data.token);

        const dataResources = requestDataHandler('GET', '/resources', undefined, {
          filter: {
            where: {
              level: 1,
              userId: response.data.id
            }
          }
        });

        const responseResources = await axios(dataResources).catch(err => {
          this.dispatch("notification/fetch", {
            type: "error",
            message: `${err}`,
            isActive: true
          });
        });

        commit('set', response.data);

        if (responseResources !== undefined && responseResources.status === 200) {
          commit('setResources', responseResources.data.resources);
        }
      }
    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/profile/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('user/set', response.data);
        router.push(`/users/${response.data.id}`)
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/profile/update', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('profile/set', response.data);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async changePassword({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/profile/password-change', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async remove({
      commit
    }) {
      const data = requestDataHandler('DELETE', '/profile/remove');

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('authenticate/logout');
      }
    },

    set({
      commit
    }, payload) {
      commit('set', payload);
    },

    setResources({
      commit
    }, payload) {
      commit('setResources', payload);
    },

    clear({
      commit
    }) {
      commit('set', {
        ...profile
      })
    }
  },
  getters: {
    get(state) {
      return state.profile;
    },
    getResources(state) {
      return state.resources;
    }
  }
};
