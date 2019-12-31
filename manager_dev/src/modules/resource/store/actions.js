import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

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
      if (response.data.layout) {
        commit('SET_FIELDS', response.data.layout.fields);
      }
      commit('SET_TRANSLATIONS', response.data);
      commit('SET_SERIALIZED_FIELDS');

      this.dispatch('preloader/fetch', false);
      return true;
    }
    return false;
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
    return false;
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
    const data = requestDataHandler('PUT', `/resources/update/${payload.params.id}`, payload.body, payload.query);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Ошибка при сохранении!',
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      commit('SET', response.data);
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
    const data = requestDataHandler('DELETE', `/resources/remove/${payload.params.id}`, payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 204) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('resource/clear');
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

  async insertToSidebarResources({
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
      commit('INSERT_SIDEBAR_RESOURCES', response.data);
      return true;
    }
    return false;
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
    commit('SET_ADDITIONAL_FIELDS', []);
    commit('SET_FIELDS', []);
    commit('SET_SERIALIZED_FIELDS');
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
    const data = requestDataHandler('PUT', '/resources/add-translation', payload.body);

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
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
      return true;
    }
    return false;
  }
};

export default actions;
