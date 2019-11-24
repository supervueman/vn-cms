import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';
import order from '../models/order';

const actions = {
  async findByPk({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', `/orders/find/${payload.params.id}`, undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      console.log(response)
      if (response.data.delivery_info === '') {
        response.data.delivery_info = '{}';
      }

      if (!response.data.delivery) {
        response.data.delivery = {
          value: "{}"
        };
      }

      const delivery_info = JSON.parse(response.data.delivery_info);
      const delivery = JSON.parse(response.data.delivery.value);

      response.data.delivery_info = {};

      for (const elem in delivery) {
        response.data.delivery_info[elem] = {
          value: delivery_info[elem],
          ...delivery[elem]
        }
      }
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
    }
  },

  async findOne({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/orders/findone', undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
    }
  },

  async create({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/orders/create', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Success!',
        isActive: true
      });

      const data = requestDataHandler('GET', `/orders/find/${response.data.id}`, undefined, {
        filter: {
          include: ['owner', 'manager', 'orderstatus']
        }
      });

      const newOrder = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      commit('PUSH_TO_ALL', newOrder.data);
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/orders/update', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Success!',
        isActive: true
      });
      // commit('SET', response.data);
    }
  },

  async remove({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('DELETE', '/orders/remove', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Success!',
        isActive: true
      });
      this.dispatch('preloader/fetch', false);
    }
  },

  async findAll({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/orders', undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET_ALL', response.data);
    }
  },

  async count({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/orders/count', undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
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
      ...order,
    });
  },

  clearAll({
    commit
  }) {
    commit('SET_ALL', []);
  },
};

export default actions;
