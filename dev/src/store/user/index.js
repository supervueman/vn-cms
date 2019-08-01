import user from '@/fakers/manager';
import defaultUser from '@/models/profile';
import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: defaultUser,
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
    async fetch({
      commit
    }, payload) {
      setTimeout(() => {
        commit('set', user);
      }, 1500);
    },

    async fetchAll({
      commit
    }, payload) {
      const params = {
        filter: {
          limit: payload.limit,
          offset: payload.skip
        }
      }

      const data = requestDataHandler('GET', 'http://localhost:3000/user/queryAll', undefined, params);
      const result = await axios(data);

      if (result !== undefined) {
        commit('setAll', result.data.users);
        commit('setCount', result.data.count);
      }
    },

    set({
      commit
    }, payload) {
      commit('set', user);
    },

    clear({
      commit
    }) {
      commit('set', defaultUser)
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
