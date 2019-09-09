import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

// Models
import user from '@/models/user';

export default {
  namespaced: true,
  state: {
    user: {
      ...user
    },
    users: [],
    count: 0
  },
  mutations: {
    set(state, payload) {
      state.user = payload;
    },
    setAll(state, payload) {
      state.users = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/users/user/${payload.id}`, undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', response.data);
      }
    },

    // Test
    async findOne({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/users/findone', undefined, {
        filter: {
          where: {
            email: 'ahmed@gmail.com'
          }
        }
      });

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        console.log(response)
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/users/update', payload.profile, payload.filter);

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
        commit('set', response.data);
      }
    },

    async changePassword({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/users/password-change', payload);

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
    }, payload) {
      const data = requestDataHandler('DELETE', '/users/remove', {
        id: payload
      });

      const response = await axios(data);

      if (response !== undefined) {
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно удалено!',
          isActive: true
        });
      } else {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Произошла ошибка при удалении!',
          isActive: true
        });
      }
    },

    async findAll({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/users', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setAll', response.data);
      }
    },

    async count({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/users/count', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setCount', response.data.count);
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
      commit('set', {
        ...user
      });
    },

    clearAll({
      commit
    }) {
      commit('setAll', []);
    },
  },
  getters: {
    get(state) {
      return state.user;
    },
    getAll(state) {
      return state.users;
    },
    getCount(state) {
      return state.count;
    }
  }
};
