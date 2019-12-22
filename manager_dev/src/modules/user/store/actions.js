import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

import user from '../models/user';

const actions = {
  async findByPk({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', `/users/find/${payload.id}`, undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
    }
  },

  // Test
  async findOne({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/users/findone', undefined, {
      filter: {
        where: {
          email: 'ahmed@gmail.com'
        }
      }
    });

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/users/update', payload.body, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
      commit('SET', response.data);
    }
  },

  async changePassword({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/users/password-change', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
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
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('DELETE', '/users/remove', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
      return false;
    });

    if (typeof response === 'object' && response.status === 204) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно удалено!',
        isActive: true
      });
      return true;
    }
  },

  async findAll({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/users', undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_ALL', response.data);
    }
  },

  async count({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/users/count', undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_COUNT', response.data.count);
    }
  },

  set({
    commit
  }, payload) {
    commit('SET', payload);
  },

  setAll({
    commit
  }, payload) {
    commit('SET_ALL', payload);
  },

  clear({
    commit
  }) {
    commit('SET', {
      ...user
    });
  },

  clearAll({
    commit
  }) {
    commit('SET_ALL', []);
  },
};

export default actions;
