import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

// Models
import test from '../models/test';

const actions = {
  async findByPk({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', `/test/find/${payload.params.id}`);

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      commit('SET', response.data);

      this.dispatch('preloader/fetch', false);
    }
  },

  async create({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/test/create', payload.body);

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
    }
  },

  async update({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', `/test/update/${payload.params.id}`);

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
      `/test/remove/${payload.params.id}`
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
    const data = requestDataHandler('GET', '/test');

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
    const data = requestDataHandler('GET', '/test/count');

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

  set({ commit }, payload) {
    commit('SET', payload);
  },

  setAll({ commit }, payload) {
    commit('SET_ALL', payload);
    commit('SET_COUNT', payload.length);
  },

  clear({ commit }) {
    commit('SET', {
      ...test
    });
  },

  clearAll({ commit }) {
    commit('SET_ALL', []);
  }
};

export default actions;
