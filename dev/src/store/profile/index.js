import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

export default {
  namespaced: true,
  state: {
    profile: {
      id: 0,
      slug: '',
      email: '',
      role: {},
      roleId: 0,
      phone: '',
      firstname: '',
      lastname: '',
      middlename: '',
      image: '',
      facebook: '',
      vkontakte: '',
      instagram: '',
      password: '',
      token: '',
      userId: ''
    },
    profileResources: []
  },
  mutations: {
    set(state, payload) {
      state.profile = payload;
    },

    setProfileResources(state, payload) {
      state.profileResources = payload;
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
          commit('setProfileResources', responseResources.data.resources);
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

    setProfileResources({
      commit
    }, payload) {
      commit('setProfileResources', payload);
    },

    clear({
      commit
    }) {
      commit('set', {
        id: 0,
        slug: '',
        email: '',
        role: {},
        roleId: 0,
        phone: '',
        firstname: '',
        lastname: '',
        middlename: '',
        image: '',
        facebook: '',
        vkontakte: '',
        instagram: '',
        password: '',
        token: '',
        userId: ''
      })
    }
  },
  getters: {
    get(state) {
      return state.profile;
    },
    getProfileResources(state) {
      return state.profileResources;
    }
  }
};
