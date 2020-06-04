import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

import ordermodificator from '../models/ordermodificator';

const actions = {
  async findByPk({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      `/ordermodificators/find/${payload.params.id}`
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
      return false;
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
      return true;
    }
    return false;
  },

  async findOne({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/ordermodificators/findone',
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
      return false;
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
      return true;
    }
    return false;
  },

  async findAll({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/ordermodificators',
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
      return false;
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_ALL', response.data);
      return true;
    }
    return false;
  },

  async create({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'POST',
      '/ordermodificators/create',
      payload.body
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
      return false;
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      commit('PUSH_TO_ALL', response.data);
      return true;
    }
    return false;
  },

  async update({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'PUT',
      `/ordermodificators/update/${payload.params.id}`,
      payload.body
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
      return false;
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
  },

  async remove({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'DELETE',
      `/ordermodificators/remove/${payload.params.id}`,
      payload.body
    );

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
      return false;
    });

    if (typeof response === 'object' && response.status === 204) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('layout/clear');
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      return true;
    }
    return false;
  },

  async count({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/ordermodificators/count',
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
      return false;
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_COUNT', response.data.count);
      return true;
    }
    return false;
  },

  set({ commit }, payload) {
    commit('SET', payload);
  },

  setAll({ commit }, payload) {
    commit('SET_ALL', payload);
  },

  clear({ commit }) {
    commit('SET', {
      ...ordermodificator
    });
  },

  clearAll({ commit }) {
    commit('SET_ALL', []);
  }
};

export default actions;
