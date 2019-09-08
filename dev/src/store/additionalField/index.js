import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/additionalfields/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
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
      const data = requestDataHandler('PUT', '/additionalfields/update', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
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
      const data = requestDataHandler('DELETE', '/additionalfields/remove', {
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
      }
    },
  },
  getters: {}
};
