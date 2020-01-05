import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

import profile from '../models/profile';

const actions = {
  // Получение профиля
  async findByAccessToken({
    commit
  }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/profile', undefined, {
      filter: {
        include: ['role', 'context']
      }
    });

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
      return false;
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);

      localStorage.setItem('x-api-key', response.data.token);

      commit('SET_RULES', response.data.role.rules);
      commit('SET', response.data);
      return true;
    }
    return false;
  },

  async createByEmail({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/profile/create-by-email', payload.body);

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
      this.dispatch('user/set', response.data);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Success',
        isActive: true
      });
      return true;
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/profile/update', payload.body);

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
        message: 'Success',
        isActive: true
      });
    }
  },

  async changePassword({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/profile/password-change', payload.body);

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
        message: 'Success',
        isActive: true
      });
    }
  },

  async resetPasswordByEmailRequest({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/profile/password-reset-by-email-request', payload.body);

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
        message: 'Success',
        isActive: true
      });
    }
  },

  async resetPasswordByEmail({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/profile/password-reset-by-email', payload.body, undefined, payload.headers);

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
        message: 'Success',
        isActive: true
      });
    }
  },

  async remove({
    commit
  }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('DELETE', '/profile/remove');

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
      this.dispatch('authenticate/logout');
    }
  },

  set({
    commit
  }, payload) {
    commit('SET', payload);
  },

  clear({
    commit
  }) {
    commit('SET', {
      ...profile
    });
  },

  clearRules({
    commit
  }) {
    commit('SET_RULES', {});
  }
};

export default actions;
