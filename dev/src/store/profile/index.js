import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

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

      const result = await axios(data);

      if (result !== undefined) {
        localStorage.setItem('x-api-key', result.data.token);
        commit('set', result.data);
      }
    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/profile/create', payload);

      const result = await axios(data);

      if (result !== undefined) {
        this.dispatch('user/set', result.data);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
      } else {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка при создании!',
          isActive: true
        });
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/profile/update', payload);

      const result = await axios(data);

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
