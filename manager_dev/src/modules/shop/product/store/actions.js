import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';
import router from '@/connector/index.route.js';

// Models
import resource from '../models/product';
import layout from '../../../layout/models/layout';

const actions = {
  async findByPk({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', `/products/find/${payload.params.id}`, undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      commit('SET', response.data);
      commit('SET_ADDITIONAL_FIELDS', response.data.productfields);
      commit('SET_LAYOUT', response.data.layout);
      commit('SET_FIELDS', response.data.layout.fields);
      commit('SET_TRANSLATIONS', response.data);
      commit('SET_SERIALIZED_FIELDS');

      this.dispatch('preloader/fetch', false);

      const params = {
        query: {
          filter: {
            offset: 0,
            limit: 10,
            order: [
              ["createdAt", "DESC"]
            ],
            where: {
              level: response.data.level + 1,
              parentId: response.data.id
            },
          }
        }
      };

      await this.dispatch("shop/product/findAll", params);
      await this.dispatch('shop/product/count', params);
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
    const data = requestDataHandler('POST', '/products/create', payload.body);

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
      if (payload.body.translationId !== '' && payload.body.translationId !== null && payload.body.translationId !== undefined) {
        for await (let translation of this.getters['shop/product/getTranslations']) {
          await this.dispatch('shop/product/addTranslation', {
            body: {
              id: response.data.id,
              translationId: translation.id
            }
          });
          await this.dispatch('shop/product/addTranslation', {
            body: {
              id: translation.id,
              translationId: response.data.id
            }
          });
        }
      }

      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });

      router.push(`/shop/products/${response.data.id}`);
    }
  },

  async findTypes({
    commit
  }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/resourcetypes');

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      commit('SET_TYPES', response.data);
      this.dispatch('preloader/fetch', false);
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/products/update', payload.body, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Ошибка при сохранении!',
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
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
    const data = requestDataHandler('DELETE', '/products/remove', payload.body);

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
      this.dispatch('product/clear');
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно удалено!',
        isActive: true
      });
      router.push('/shop/products');
    }
  },

  async findAll({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/products', undefined, payload.query);

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
      commit('SET_COUNT', response.data.count);
    }
  },

  async count({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/products/count', undefined, payload.query);

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
    commit('SET_COUNT', payload.length);
  },

  clear({
    commit
  }) {
    commit('SET', {
      ...resource
    });
  },

  clearAll({
    commit
  }) {
    commit('SET_ALL', []);
  },

  clearLayout({
    commit
  }) {
    commit('SET_LAYOUT', {
      ...layout
    });
  },

  clearFields({
    commit
  }) {
    commit('SET_FIELDS', []);
  },

  clearAdditionalFields({
    commit
  }) {
    commit('SET_ADDITIONAL_FIELDS', []);
  },

  async addTranslation({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/products/add-translation', payload.body, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Ошибка при сохранении!',
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('SET', response.data);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
    }
  }
};

export default actions;
