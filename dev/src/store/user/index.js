import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: {
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
      const data = requestDataHandler('GET', `/users/user/${payload.id}`, undefined, payload.filter);

      const result = await axios(data);

      if (result !== undefined) {
        commit('set', result.data);
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

      const result = await axios(data);

      if (result !== undefined) {
        console.log(result)
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/users/update', payload.profile, payload.filter);

      const result = await axios(data);

      if (result !== undefined) {
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
        commit('set', result.data);
      } else {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Произошла ошибка при сохранении!',
          isActive: true
        });
      }
    },

    async changePassword({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/users/password-change', payload);

      const result = await axios(data);

      if (result !== undefined) {
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
      const data = requestDataHandler('DELETE', '/users/remove', {
        id: payload
      });

      const result = await axios(data);

      if (result !== undefined) {
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
      const data = requestDataHandler('GET', '/users', undefined, payload);
      const result = await axios(data);

      if (result !== undefined) {
        commit('setAll', result.data.users);
        commit('setCount', result.data.count);
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
