import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    // fields: {
    //   text: {
    //     value: 'Text field',
    //     interface: {
    //       id: '1',
    //         slug: 'text',
    //         title: 'Текстовое поле',
    //         fieldType: 'text',
    //         schema: '',
    //         defaultValue: 'Текстовое поле'
    //     }
    //   },
    //   textarea: {
    //     value: 'Textarea field',
    //     interface: {
    //       id: '2',
    //         slug: 'textarea',
    //         title: 'Текстовая область',
    //         fieldType: 'textarea',
    //         schema: '',
    //         defaultValue: 'Текстовая область'
    //     }
    //   },
    //   editor: {
    //     value: 'Texteditor field',
    //     interface: {
    //       id: '3',
    //         slug: 'editor',
    //         title: 'Текстовый редактор',
    //         fieldType: 'editor',
    //         schema: '',
    //         defaultValue: 'Текстовый редактор'
    //     },
    //   },
    //   image: {
    //     value: 'files/image-1.jpg',
    //     interface: {
    //       id: '4',
    //         slug: 'image',
    //         title: 'Изображение',
    //         fieldType: 'image',
    //         schema: '',
    //         defaultValue: 'Изображение'
    //     }
    //   },
    //   select: {
    //     value: 'Item 1',
    //     interface: {
    //       id: '5',
    //         slug: 'select',
    //         title: 'Селект',
    //         fieldType: 'select',
    //         schema: '',
    //         defaultValue: ['Item 1', 'Item 2', 'Item 3']
    //     },
    //   },
    //   migx: {
    //     value: [{
    //       text: {
    //         value: 'Text field',
    //         interface: {
    //           id: '1',
    //             slug: 'text',
    //             title: 'Заголовок',
    //             fieldType: 'text',
    //             defaultValue: 'Текстовое поле'
    //         }
    //       },
    //       image: {
    //         value: 'files/image-1.jpg',
    //         interface: {
    //           id: '4',
    //             slug: 'image',
    //             title: 'Изображение',
    //             fieldType: 'image',
    //             defaultValue: 'Изображение'
    //         }
    //       },
    //       date: {
    //         value: '2019-07-20',
    //         interface: {
    //           id: '7',
    //             slug: 'date',
    //             title: 'Дата',
    //             fieldType: 'date',
    //             sschemahcema: '',
    //             defaultValue: 'Дата'
    //         }
    //       },
    //     }, {
    //       text: {
    //         value: 'Text field',
    //         interface: {
    //           id: '1',
    //             slug: 'text',
    //             title: 'Заголовок',
    //             fieldType: 'text',
    //             schema: '',
    //             defaultValue: 'Текстовое поле'
    //         }
    //       },
    //       image: {
    //         value: 'files/image-2.jpg',
    //         interface: {
    //           id: '4',
    //             slug: 'image',
    //             title: 'Изображение',
    //             fieldType: 'image',
    //             schema: '',
    //             defaultValue: 'Изображение'
    //         }
    //       },
    //       date: {
    //         value: '2019-07-20',
    //         interface: {
    //           id: '7',
    //             slug: 'date',
    //             title: 'Дата',
    //             fieldType: 'date',
    //             sschemahcema: '',
    //             defaultValue: 'Дата'
    //         }
    //       },
    //     }],
    //     interface: {
    //       id: '6',
    //         slug: 'migx',
    //         title: 'Migx',
    //         fieldType: 'migx',
    //         schema: '{"title": {"title": "Заголовок", "fieldType": "text"}, "image": {"title": "Изображение", "fieldType": "image"}, "date": {"title": "Дата", "fieldType": "date"}}',
    //         defaultValue: 'Migx'
    //     },
    //   },
    //   date: {
    //     value: '2019-07-20',
    //     interface: {
    //       id: '7',
    //         slug: 'date',
    //         title: 'Дата',
    //         fieldType: 'date',
    //         sschemahcema: '',
    //         defaultValue: 'Дата'
    //     }
    //   },
    //   time: {
    //     value: '2019-07-20',
    //     interface: {
    //       id: '8',
    //         slug: 'time',
    //         title: 'Время',
    //         fieldType: 'time',
    //         schema: '',
    //         defaultValue: 'Время'
    //     }
    //   },
    //   colorpicker: {
    //     value: '#dfv45f',
    //     interface: {
    //       id: '9',
    //         slug: 'colorpicker',
    //         title: 'Колорпикер',
    //         fieldType: 'colorpicker',
    //         schema: '',
    //         defaultValue: 'Колорпикер'
    //     }
    //   },
    //   checkbox: {
    //     value: false,
    //     interface: {
    //       id: '10',
    //         slug: 'checkbox',
    //         title: 'Чекбокс',
    //         fieldType: 'checkbox',
    //         schema: '',
    //         defaultValue: 'Чекбокс'
    //     }
    //   }
    // }
  },
  mutations: {

  },
  actions: {
    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/additionalfields/create', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async update({
      commit
    }, payload) {
      const data = requestDataHandler('PUT', '/additionalfields/update', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Успешно сохранено!',
          isActive: true
        });
      }
    },

    async remove({
      commit
    }, payload) {
      const data = requestDataHandler('DELETE', '/additionalfields/remove', {
        id: payload
      });

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('layout/clear');
        this.dispatch('notification/fetch', {
          type: 'success',
          message: `Успешно удалено!`,
          isActive: true
        });
      }
    },
  },
  getters: {

  }
};
