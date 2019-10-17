import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

// Models
import fieldCategory from '@/models/fieldCategory';

export default {
  namespaced: true,
  state: {
    fieldCategory: {
      ...fieldCategory
    },
    fieldCategories: [],
    count: 0,
    layouts: []
  },
  mutations: {
    set(state, payload) {
      state.fieldCategory = payload;
    },
    setAll(state, payload) {
      state.fieldCategories = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    }
  },
  actions: {
    async findAll({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/fieldcategories', undefined, payload.query);

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

    async findByPk({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', `/fieldcategories/find/${payload.params.id}`, undefined, payload.query);

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

    },

    async create({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('POST', '/fieldcategories/create', payload.body);

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
        router.push(`/fieldcategories/${response.data.id}`);
      }
    },

    async update({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('PUT', '/fieldcategories/update', payload.body);

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
      const data = requestDataHandler('DELETE', '/fieldcategories/remove', payload.body);

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
          message: 'Успешно удалено!',
          isActive: true
        });
        router.push('/fieldcategories');
      }
    },

    async count({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/fieldcategories/count', undefined, payload.query);

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
        ...fieldCategory
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
      return state.fieldCategory;
    },
    getAll(state) {
      return state.fieldCategories;
    },
    getCount(state) {
      return state.count;
    }
  }
};
