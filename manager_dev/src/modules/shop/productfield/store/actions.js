import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

const actions = {
  async create({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/productfields/create', payload);

    const response = await axios(data).catch(err => {
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
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', `/productfields/update/${payload.params.id}`, payload.body);

    const response = await axios(data).catch(err => {
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
    }
  },

  async updateAll({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/productfields/update-all', payload);

    const response = await axios(data).catch(err => {
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
    }
  },

  async remove({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('DELETE', '/productfields/remove', {
      id: payload
    });

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch('notification/fetch', {
        type: 'error',
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('layout/clear');
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
    }
  },
};

export default actions;
