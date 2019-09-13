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

      const fields = state.fields.map(el => el);
      const additionalFields = state.additionalFields.map(el => el);

      function serializedFieldsFunc(fields, additionalFields) {
        fields.forEach((el1, i) => {
          additionalFields.forEach((el2, j) => {
            if (el1.slug === el2.slug) {
              serializedFields[el1.slug] = {
                ...el2,
                interface: {
                  ...el1
                }
              }

              if (el1.fieldType === 'migx') {
                serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
                serializedFields[el1.slug].value = JSON.parse(serializedFields[el2.slug].value);
              }
              if (el1.fieldType === 'select') {
                serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
              }
              if (el1.fieldType === 'multiselect') {
                serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
                serializedFields[el1.slug].value = JSON.parse(serializedFields[el2.slug].value);
              }
              if (el1.fieldType === 'radio') {
                serializedFields[el1.slug].interface.defaultValue = JSON.parse(el1.defaultValue);
              }
              fields.splice(i, 1);
              additionalFields.splice(j, 1);
              serializedFieldsFunc(fields, additionalFields);
              return;
            }
          });
        });
      }

      if (fields.length > 0) {
        fields.forEach(el => {
          serializedFields[el.slug] = {
            slug: el.slug,
            value: el.defaultValue,
            fieldId: el.id,
            resourceId: state.resource.id,
            interface: {
              ...el
            }
          }
          if (el.fieldType === 'select') {
            serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
          }
          if (el.fieldType === 'migx') {
            serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
            serializedFields[el.slug].value = JSON.parse(el.defaultValue);
          }
          if (el.fieldType === 'multiselect') {
            serializedFields[el.slug].value = [];
            serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
          }
          if (el.fieldType === 'radio') {
            serializedFields[el.slug].interface.defaultValue = JSON.parse(el.defaultValue);
          }
        });
      }

      serializedFieldsFunc(fields, additionalFields);

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
    }
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
