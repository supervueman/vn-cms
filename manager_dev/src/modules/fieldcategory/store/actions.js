import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';
import router from '@/connector/index.route.js';

import fieldCategory from '../models/fieldcategory';

const actions = {
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
      commit('SET_ALL', response.data);
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
      commit('SET', response.data);
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
    console.log(payload)
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
      ...fieldCategory
    });
  },

  clearAll({
    commit
  }) {
    commit('SET_ALL', []);
  },
};

export default actions;
