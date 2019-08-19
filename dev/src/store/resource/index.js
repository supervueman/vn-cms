import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';
import router from '@/routers';

// Models
import resource from '@/models/resource';

export default {
  namespaced: true,
  state: {
    resource: {
      ...resource
    },
    layout: {},
    fields: {
      text: {
        value: 'Text field',
        interface: {
          id: '1',
            slug: 'text',
            title: 'Текстовое поле',
            fieldType: 'text',
            schema: '',
            defaultValue: 'Текстовое поле'
        }
      },
      textarea: {
        value: 'Textarea field',
        interface: {
          id: '2',
            slug: 'textarea',
            title: 'Текстовая область',
            fieldType: 'textarea',
            schema: '',
            defaultValue: 'Текстовая область'
        }
      },
      editor: {
        value: 'Texteditor field',
        interface: {
          id: '3',
            slug: 'editor',
            title: 'Текстовый редактор',
            fieldType: 'editor',
            schema: '',
            defaultValue: 'Текстовый редактор'
        },
      },
      image: {
        value: 'files/image-1.jpg',
        interface: {
          id: '4',
            slug: 'image',
            title: 'Изображение',
            fieldType: 'image',
            schema: '',
            defaultValue: 'Изображение'
        }
      },
      select: {
        value: 'Item 1',
        interface: {
          id: '5',
            slug: 'select',
            title: 'Селект',
            fieldType: 'select',
            schema: '',
            defaultValue: ['Item 1', 'Item 2', 'Item 3']
        },
      },
      migx: {
        value: [{
          text: {
            value: 'Text field',
            interface: {
              id: '1',
                slug: 'text',
                title: 'Заголовок',
                fieldType: 'text',
                defaultValue: 'Текстовое поле'
            }
          },
          image: {
            value: 'files/image-1.jpg',
            interface: {
              id: '4',
                slug: 'image',
                title: 'Изображение',
                fieldType: 'image',
                defaultValue: 'Изображение'
            }
          },
          date: {
            value: '2019-07-20',
            interface: {
              id: '7',
                slug: 'date',
                title: 'Дата',
                fieldType: 'date',
                sschemahcema: '',
                defaultValue: 'Дата'
            }
          },
        }, {
          text: {
            value: 'Text field',
            interface: {
              id: '1',
                slug: 'text',
                title: 'Заголовок',
                fieldType: 'text',
                schema: '',
                defaultValue: 'Текстовое поле'
            }
          },
          image: {
            value: 'files/image-2.jpg',
            interface: {
              id: '4',
                slug: 'image',
                title: 'Изображение',
                fieldType: 'image',
                schema: '',
                defaultValue: 'Изображение'
            }
          },
          date: {
            value: '2019-07-20',
            interface: {
              id: '7',
                slug: 'date',
                title: 'Дата',
                fieldType: 'date',
                sschemahcema: '',
                defaultValue: 'Дата'
            }
          },
        }],
        interface: {
          id: '6',
            slug: 'migx',
            title: 'Migx',
            fieldType: 'migx',
            schema: '{"title": {"title": "Заголовок", "fieldType": "text"}, "image": {"title": "Изображение", "fieldType": "image"}, "date": {"title": "Дата", "fieldType": "date"}}',
            defaultValue: 'Migx'
        },
      },
      date: {
        value: '2019-07-20',
        interface: {
          id: '7',
            slug: 'date',
            title: 'Дата',
            fieldType: 'date',
            sschemahcema: '',
            defaultValue: 'Дата'
        }
      },
      time: {
        value: '2019-07-20',
        interface: {
          id: '8',
            slug: 'time',
            title: 'Время',
            fieldType: 'time',
            schema: '',
            defaultValue: 'Время'
        }
      },
      colorpicker: {
        value: '#dfv45f',
        interface: {
          id: '9',
            slug: 'colorpicker',
            title: 'Колорпикер',
            fieldType: 'colorpicker',
            schema: '',
            defaultValue: 'Колорпикер'
        }
      },
      checkbox: {
        value: false,
        interface: {
          id: '10',
            slug: 'checkbox',
            title: 'Чекбокс',
            fieldType: 'checkbox',
            schema: '',
            defaultValue: 'Чекбокс'
        }
      }
    },
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
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/resources/resource/${payload}`);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('set', response.data);

        await this.dispatch("resource/findAll", {
          filter: {
            offset: 0,
            limit: 10,
            order: [
              ["createdAt", "DESC"]
            ],
            where: {
              level: response.data.level + 1,
              parentId: response.data.id
            }
          }
        });
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
      const data = requestDataHandler('PUT', '/resources/update', payload);

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

    async findAll({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/resources', undefined, payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setAll', response.data.resources);
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
    }
  }
};
