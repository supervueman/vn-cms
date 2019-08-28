import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

// Models
import field from '@/models/field';

export default {
  namespaced: true,
  state: {
    field: {
      ...field
    },
    fields: [],
    count: 0,
    types: ['text', 'textarea', 'editor', 'image', 'select', 'migx', 'radio', 'date', 'time', 'colorpicker', 'checkbox']
  },
  mutations: {
    set(state, payload) {
      state.field = payload;
    },
    setAll(state, payload) {
      state.fields = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/fields/field/${payload}`);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
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

    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/fields/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', payload);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Успешно сохранено!',
          isActive: true
        });
        router.push(`/fields/${response.data.id}`);
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/fields/update', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', payload);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async remove({
      commit
    }, payload) {
      const data = requestDataHandler('DELETE', '/fields/remove', {
        id: payload
      });

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('layout/clear');
        this.dispatch('notification/fetch', {
          type: 'success',
          message: `Успешно удалено!`,
          isActive: true
        });
        router.push('/fields');
      }
    },

    async findAll({
      commit
    }, payload) {
      const data = requestDataHandler(
        'GET',
        '/fields',
        undefined,
        payload.query
      );

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
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
      const data = requestDataHandler(
        'GET',
        '/fields/count',
        undefined,
        payload.query
      );

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
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

    setAll({
      commit
    }, payload) {
      commit('setAll', payload);
    },

    clear({
      commit
    }) {
      commit('set', {
        ...field
      });
    },

    clearAll({
      commit
    }) {
      commit('setAll', []);
    }
  },
  getters: {
    get(state) {
      return state.field;
    },
    getAll(state) {
      return state.fields;
    },
    getCount(state) {
      return state.count;
    },
    getTypes(state) {
      return state.types;
    }
  }
};
