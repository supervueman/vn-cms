import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

// Models
import layout from '@/models/layout';

export default {
  namespaced: true,
  state: {
    layout: {
      ...layout
    },
    layouts: [],
    count: 0
  },
  mutations: {
    set(state, payload) {
      state.layout = payload;
    },
    setAll(state, payload) {
      state.layouts = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/layouts/layout/${payload}`);

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

    async findOne({
      commit
    }, payload) {
      commit('set', layout);
    },

    async create({
      commit
    }, payload) {

      const data = requestDataHandler('POST', '/layouts/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', payload);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
        router.push(`/layouts/${response.data.id}`);
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/layouts/update', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', payload);
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
      const data = requestDataHandler('DELETE', '/layouts/remove', {
        id: payload
      });

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('layout/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно удалено!`,
          isActive: true
        });
        router.push('/layouts');
      }
    },

    async findAll({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/layouts', undefined, payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setAll', response.data.layouts);
        commit('setCount', response.data.count);
      }
    },

    set({
      commit
    }, payload) {
      commit('set', layout);
    },

    setAll({
      commit
    }, payload) {
      commit('setAll', payload);
      commit('setCount', payload.length);
    },

    clear({
      commit
    }) {
      commit('set', {
        ...layout
      });
    }
  },
  getters: {
    get(state) {
      return state.layout;
    },
    getAll(state) {
      return state.layouts;
    },
    getCount(state) {
      return state.count;
    }
  }
};
