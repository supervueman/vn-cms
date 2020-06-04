import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

// Models
import product from '../models/product';
import layout from '../../../../core/modules/layout/models/layout';

const actions = {
  async findByPk({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      `/products/find/${payload.params.id}`,
      undefined,
      payload.query
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      if (response.data.modificators) {
        response.data.modificators = JSON.parse(response.data.modificators);
      } else {
        response.data.modificators = [];
      }
      commit('SET', response.data);
      commit('SET_ADDITIONAL_FIELDS', response.data.productfields);
      if (response.data.layout) {
        commit('SET_FIELDS', response.data.layout.fields);
      }
      commit('SET_TRANSLATIONS', response.data);
      commit('SET_SERIALIZED_FIELDS');

      this.dispatch('preloader/fetch', false);
      return true;
    }
    return false;
  },

  async create({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/products/create', payload.body);

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });

      commit('SET', response.data);
      return true;
    }
    return false;
  },

  async findTypes({ commit }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/resourcetypes');

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      commit('SET_TYPES', response.data);
      this.dispatch('preloader/fetch', false);
    }
  },

  async update({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'PUT',
      `/products/update/${payload.params.id}`,
      payload.body,
      payload.query
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      commit('SET', response.data);
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
    }
  },

  async remove({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'DELETE',
      `/products/remove/${payload.params.id}`,
      payload.body
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 204) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('product/clear');
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      return true;
    }
  },

  async findAll({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/products',
      undefined,
      payload.query
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_ALL', response.data);
    }
  },

  async count({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/products/count',
      undefined,
      payload.query
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_COUNT', response.data.count);
    }
  },

  async findSidebarContexts({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/contexts',
      undefined,
      payload.query
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_SIDEBAR_CONTEXTS', response.data);
    }
  },

  async insertToSidebarProducts({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/products',
      undefined,
      payload.query
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('INSERT_SIDEBAR_PRODUCTS', response.data);
      return true;
    }
    return false;
  },

  set({ commit }, payload) {
    commit('SET', payload);
  },

  setAll({ commit }, payload) {
    commit('SET_ALL', payload);
    commit('SET_COUNT', payload.length);
  },

  clear({ commit }) {
    commit('SET', {
      ...product
    });
    commit('SET_ADDITIONAL_FIELDS', []);
    commit('SET_FIELDS', []);
    commit('SET_SERIALIZED_FIELDS');
  },

  clearAll({ commit }) {
    commit('SET_ALL', []);
  },

  clearLayout({ commit }) {
    commit('SET_LAYOUT', {
      ...layout
    });
  },

  clearFields({ commit }) {
    commit('SET_FIELDS', []);
  },

  clearAdditionalFields({ commit }) {
    commit('SET_ADDITIONAL_FIELDS', []);
  },

  async addTranslation({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'PUT',
      '/products/add-translation',
      payload.body
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      return true;
    }
    return false;
  }
};

export default actions;
