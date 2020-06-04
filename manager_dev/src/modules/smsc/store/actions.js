import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

// Models
import smsc from '../models/smsc';

const actions = {
  async findOne({ commit }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/smsc/findOne');

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
      commit('SET', response.data);
    }
  },

  async create({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/smsc/create', payload.body);

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

  async update({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/smsc/update', payload.body);

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

  async remove({ commit }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('DELETE', '/smsc/remove');

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
      this.dispatch('resource/clear');
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      return true;
    }
  },

  async fetchBalance({ commit }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/smsc/balance');

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
      commit('SET_BALANCE', response.data.balance);
    }
  },

  async sendSms(_, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/smsc/send-sms', payload.body);

    const response = await axios(data).catch((err) => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (response && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      return true;
    }
  },

  async findPhones({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/smsc/find-phones',
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
      commit('SET_PHONES', response.data);
    }
  },

  set({ commit }, payload) {
    commit('SET', payload);
  },

  clear({ commit }) {
    commit('SET', {
      ...smsc
    });
  }
};

export default actions;
