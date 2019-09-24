import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

const dictionary = {
  lang: '',
  title: '',
  value: ''
}

export default {
  namespaced: true,
  state: {
    dictionary: {
      ...dictionary
    },
    dictionaries: [],
    count: 0
  },
  mutations: {
    set(state, payload) {
      state.dictionary = {
        ...payload,
        value: typeof payload.value === 'object' ? payload.value : JSON.parse(payload.value)
      };
    },
    setAll(state, payload) {
      state.dictionaries = payload.map(el => {
        el.value = typeof el.value === 'object' ? el.value : JSON.parse(el.value);
        return el;
      });
    },
    pushToAll(state, payload) {
      const dictionary = {
        ...payload,
        value: typeof payload.value === 'object' ? payload.value : JSON.parse(payload.value)
      };
      state.dictionaries.push(dictionary);
    },
    setCount(state, payload) {
      state.count = payload;
    },
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', `/dictionaries/dictionary/${payload.params.id}`, undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('set', response.data);
      }
    },

    async findOne({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/dictionaries/findone', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('set', response.data);
      }
    },

    async create({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('POST', '/dictionaries/create', payload.body);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('pushToAll', response.data);
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async update({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('PUT', '/dictionaries/update', payload.body);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
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
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('DELETE', '/dictionaries/remove', payload.body);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch('layout/clear');
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Успешно удалено!',
          isActive: true
        });
      }
    },

    async findAll({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/dictionaries');

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('setAll', response.data);
      }
    },

    async count({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/dictionaries/count');

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
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
        ...dictionary
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
      return state.dictionary;
    },
    getAll(state) {
      return state.dictionaries;
    },
    getCount(state) {
      return state.count;
    },
  }
};
