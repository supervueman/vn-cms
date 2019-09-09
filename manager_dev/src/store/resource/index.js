import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

// Models
import resource from '@/models/resource';
import layout from '@/models/layout';

// Query
import {
  queryResources
} from '@/query/resource';

export default {
  namespaced: true,
  state: {
    resource: {
      ...resource
    },
    layout: {
      ...layout
    },
    fields: [],
    additionalFields: [],
    serializedFields: {},
    resources: [],
    count: 0
  },
  mutations: {
    set(state, payload) {
      state.resource = payload;
    },
    setAll(state, payload) {
      state.resources = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    },
    setLayout(state, payload) {
      state.layout = payload;
    },
    setFields(state, payload) {
      state.fields = payload;
    },
    setAdditionalFields(state, payload) {
      state.additionalFields = payload;
    },
    setSerializedFields(state, payload) {
      const serializedFields = {};

      const existFields = state.fields.filter(el1 => state.additionalFields.some(el2 => el1.slug === el2.slug));

      existFields.forEach((el, i) => {
        serializedFields[el.slug] = {
          ...state.additionalFields[i],
          slug: el.slug,
          interface: {
            ...el
          }
        };
        if (el.fieldType === 'select') {
          serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
        }
        if (el.fieldType === 'migx') {
          serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
          serializedFields[el.slug].value = JSON.parse(serializedFields[el.slug].value);
        }
      });

      state.fields.forEach(el => {
        if (!serializedFields[el.slug]) {
          serializedFields[el.slug] = {
            slug: el.slug,
            value: el.defaultValue,
            fieldId: el.id,
            resourceId: state.resource.id,
            interface: {
              ...el
            }
          }
          if (el.fieldType === 'select' || el.fieldType === 'migx') {
            serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
            serializedFields[el.slug].value = JSON.parse(el.defaultValue);
          }
        }
      });

      state.serializedFields = serializedFields;
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/resources/resource/${payload.id}`, undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', response.data);
        commit('setAdditionalFields', response.data.additionalfields);

        const params = {
          query: queryResources(0, 10, {
            level: response.data.level + 1,
            parentId: response.data.id
          })
        };

        await this.dispatch("resource/findAll", params);
        await this.dispatch('resource/count', params);

        await this.dispatch('resource/findLayout', {
          id: response.data.layoutId,
          query: {
            filter: {
              include: [{
                model: '$field',
              }]
            }
          }
        })
      }
    },

    async findOne({
      commit
    }, payload) {

    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/resources/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка при создании!',
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', response.data);
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно сохранено!',
          isActive: true
        });
        router.push(`/resources/${response.data.id}`);

        if (response.data.level === 1) {
          this.getters['profile/getResources'].push(response.data)
        }
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/resources/update', payload.data, payload.filter);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Ошибка при сохранении!',
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
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
      const data = requestDataHandler('DELETE', '/resources/remove', {
        id: payload
      });

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('resource/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно удалено!',
          isActive: true
        });
        router.push('/resources');
      }
    },

    async findLayout({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/layouts/layout/${payload.id}`, undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setLayout', response.data);
        commit('setFields', response.data.fields);
        commit('setSerializedFields');
      }
    },

    async findAll({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/resources', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setAll', response.data);
        commit('setCount', response.data.count);
      }
    },

    async count({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/resources/count', undefined, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
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
  },
  getters: {
    get(state) {
      return state.resource;
    },
    getAll(state) {
      return state.resources;
    },
    getCount(state) {
      return state.count;
    },
    getLayout(state) {
      return state.layout;
    },
    getFields(state) {
      return state.fields;
    },
    getAdditionalFields(state) {
      return state.additionalFields;
    },
    getSerializedFields(state) {
      return state.serializedFields;
    },
  }
};
