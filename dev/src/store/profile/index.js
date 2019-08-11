import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

const profile = {
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
};

const clearProfile = {
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
};

export default {
  namespaced: true,
  state: {
    profile
  },
  mutations: {
    set(state, payload) {
      state.profile = payload;
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
          message: 'Ошибка авторизации!',
          isActive: true
        });
        router.push('/login');
      });

      if (response !== undefined && response.status === 200) {
        localStorage.setItem('x-api-key', response.data.token);
        commit('set', response.data);
      }
    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/profile/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка при создании!',
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
          message: 'Ошибка при сохранении!',
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
          message: 'Ошибка при сохранении!',
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

      const result = await axios(data);

      if (result !== undefined) {
        this.dispatch('authenticate/logout');
      }
    },

    set({
      commit
    }, payload) {
      commit('set', payload);
    },

    clear({
      commit
    }) {
      commit('set', clearProfile)
    }
  },
  getters: {
    get(state) {
      return state.profile;
    },
  }
};
