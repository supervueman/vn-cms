import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';
import order from '../models/order';

const actions = {
  async findByPk({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      `/orders/find/${payload.params.id}`,
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

      if (!response.data.delivery) {
        response.data.delivery = {};
      }

      if (response.data.delivery_info) {
        response.data.delivery_info = JSON.parse(response.data.delivery_info);
      }

      if (response.data.modificators) {
        response.data.modificators = JSON.parse(response.data.modificators);
      }

      if (response.data.products && response.data.products.length > 0) {
        response.data.products.forEach((el) => {
          if (el.OrderProduct.modificators) {
            el.OrderProduct.modificators = JSON.parse(
              el.OrderProduct.modificators
            );
          } else {
            el.OrderProduct.modificators = [];
          }
        });
      }

      commit('SET', response.data);
      return true;
    }
    return false;
  },

  async findOne({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/orders/findone',
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

  async create({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/orders/create', payload.body);

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

      commit('SET', response.data);
      return true;
    }
    return false;
  },

  async update({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'PUT',
      `/orders/update/${payload.params.id}`,
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
      `/orders/remove/${payload.params.id}`,
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
      this.dispatch('notification/fetch', {
        type: 'success',
        message: 'Success',
        isActive: true
      });
      this.dispatch('preloader/fetch', false);
      return true;
    }
    return false;
  },

  async findAll({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/orders', undefined, payload.query);

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

  async count({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'GET',
      '/orders/count',
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

  async removeProduct({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'PUT',
      `/orders/remove-product`,
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

  async findUsers({ commit }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/users', undefined, payload.query);
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
      if (payload.mark === 'courier') {
        commit('SET_COURIERS', response.data);
      } else {
        commit('SET_MANAGERS', response.data);
      }
    }
  },

  set({ commit }, payload) {
    commit('SET', payload);
  },

  setAll({ commit }, payload) {
    commit('SET_ALL', payload);
  },

  clear({ commit }) {
    commit('SET', {
      ...order
    });
  },

  clearAll({ commit }) {
    commit('SET_ALL', []);
  }
};

export default actions;
