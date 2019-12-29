import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';
import router from '@/connector/index.route.js';

// Models
import resource from '../models/resource';
import layout from '../../layout/models/layout';

const actions = {
  async findByPk({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', `/resources/find/${payload.params.id}`, undefined, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      commit('SET', response.data);
      commit('SET_ADDITIONAL_FIELDS', response.data.additionalfields);
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

      await this.dispatch("resource/findAll", params);
      await this.dispatch('resource/count', params);
    }
  },

  async create({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/resources/create', payload.body);

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
      return true;
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

    if (typeof response === 'object' && response.status === 200) {
      commit('SET_TYPES', response.data);
      this.dispatch('preloader/fetch', false);
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/resources/update', payload.body, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Ошибка при сохранении!',
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
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
    const data = requestDataHandler('DELETE', '/resources/remove', payload.body);

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
      this.dispatch('resource/clear');
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно удалено!',
        isActive: true
      });
      router.push('/resources');
    }
  },

  async findAll({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/resources', undefined, payload.query);

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
      commit('SET_COUNT', response.data.count);
    }
  },

  async count({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/resources/count', undefined, payload.query);

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
    const data = requestDataHandler('PUT', '/resources/add-translation', payload.body, payload.query);

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
