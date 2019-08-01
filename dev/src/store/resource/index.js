import resource from '@/fakers/resource';
import defaultResource from '@/models/resource';

export default {
  namespaced: true,
  state: {
    resource: defaultResource,
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
  },
  mutations: {
    set(state, payload) {
      state.resource = payload;
    },
    setAll(state, payload) {
      state.resources = payload;
    },
    setLayout(state, payload) {
      state.layout = payload;
    },
    setFields(state, payload) {
      state.fields = payload;
    }
  },
  actions: {
    async fetch({
      commit
    }) {
      setTimeout(() => {
        commit('set', resource);
      }, 1500);
    },

    async create({
      commit
    }, payload) {
      setTimeout(() => {
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      }, 1500);
    },

    async update({
      commit
    }, payload) {
      setTimeout(() => {
        commit('set', payload);
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно сохранено!`,
          isActive: true
        });
      }, 1500);
    },

    async remove({
      commit
    }, payload) {
      setTimeout(() => {
        this.dispatch('resource/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: `Успешно удалено!`,
          isActive: true
        });
      }, 1500);
    },

    async fetchAll({
      commit
    }, payload) {
      setTimeout(() => {
        commit('setAll', [resource]);
      }, 1500);
    },

    set({
      commit
    }, payload) {
      commit('set', resource);
    },

    clear({
      commit
    }) {
      commit('set', defaultResource)
    }
  },
  getters: {
    get(state) {
      return state.resource;
    },
    getAll(state) {
      return state.resources;
    },
    getLayout(state) {
      return state.layout;
    },
    getFields(state) {
      return state.fields;
    }
  }
};
