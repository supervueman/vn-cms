import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/connector/index.route.js';

// Models
import resource from '@/models/resource';
import layout from '@/models/layout';

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

    if (response !== undefined && response.status === 200) {
      commit('set', response.data);
      commit('setAdditionalFields', response.data.additionalfields);
      commit('setLayout', response.data.layout);
      commit('setFields', response.data.layout.fields);
      commit('setTranslations', response.data);
      commit('setSerializedFields');

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

  async findOne({
    commit
  }, payload) {

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

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);

      commit('set', response.data);
      if (payload.body.translationId !== '' && payload.body.translationId !== null && payload.body.translationId !== undefined) {
        for await (let translation of this.getters['resource/getTranslations']) {
          await this.dispatch('resource/addTranslation', {
            body: {
              id: response.data.id,
              translationId: translation.id
            }
          });
          await this.dispatch('resource/addTranslation', {
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

      router.push(`/resources/${response.data.id}`);

      if (response.data.level === 1 && this.getters['base/mainLang'] === response.data.lang) {
        this.getters['profile/getResources'].push(response.data)
      }
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
      commit('setTypes', response.data);
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

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('set', response.data);
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

    if (response !== undefined && response.status === 200) {
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

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('setAll', response.data);
      commit('setCount', response.data.count);
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

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      commit('setCount', response.data.count);
    }
  },

  set({
    commit
  }, payload) {
    commit('set', payload);
  },

  setAll({
    commit
  }, payload) {
    commit('setAll', payload);
    commit('setCount', payload.length);
  },

  clear({
    commit
  }) {
    commit('set', {
      ...resource
    });
  },

  clearAll({
    commit
  }) {
    commit('setAll', []);
  },

  clearLayout({
    commit
  }) {
    commit('setLayout', {
      ...layout
    })
  },

  clearFields({
    commit
  }) {
    commit('setFields', [])
  },

  clearAdditionalFields({
    commit
  }) {
    commit('setAdditionalFields', []);
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
      commit('set', response.data);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
    }
  }
};

export default actions;
