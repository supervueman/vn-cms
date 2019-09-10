import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

const filesystem = [{
  type: 'directory',
  name: 'files',
  path: '/',
  children: [{
      type: 'file',
      name: 'image-1.jpg',
      ext: 'jpg',
      path: 'files/image-1.jpg'
    },
    {
      type: 'file',
      name: 'image-2.jpg',
      ext: 'jpg',
      path: 'files/image-2.jpg'
    },
    {
      type: 'directory',
      name: 'images',
      path: '/images',
      children: [{
          type: 'file',
          name: 'image-3.jpg',
          ext: 'jpg',
          path: 'files/images/image-3.jpg'
        },
        {
          type: 'file',
          name: 'image-4.jpg',
          ext: 'jpg',
          path: 'files/images/image-4.jpg'
        }
      ]
    }
  ]
}]

export default {
  namespaced: true,
  state: {
    filesystem: [],
    folderContent: []
  },
  mutations: {
    setFilesystem(state, payload) {
      const filesystem = [payload];

      function recursiveFilesystem(files) {
        files.forEach(el => {
          el.path = el.path.substr(3, el.path.length);
          if (el.path.slice(-1) === '/') {
            el.path = el.path.slice(0, el.path.length - 1)
          }
          if (el.type === 'directory') {
            recursiveFilesystem(el.children);
            return;
          } else {
            return;
          }
        });
      }

      recursiveFilesystem(filesystem);

      state.filesystem = filesystem;
    },
    setFolderContent(state, payload) {
      state.folderContent = payload;
    }
  },
  actions: {
    /**
     * @function fetchStorage
     * @async
     * @var {Object} params
     * @var {Function} data
     * @var {Object} response
     * Функция для получения всего Storage текущего пользователя
     */
    async fetchFilesystem({
      commit
    }) {
      const data = requestDataHandler('GET', '/filesystem', undefined);

      const response = await axios(data).catch(err => {
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        commit('setFilesystem', response.data);
        commit('setFolderContent');
      }
    },

    /**
     * @function fetchFolderContent
     * @async
     * @param {*} payload 
     */
    async fetchFolderContent({
      commit
    }, payload) {
      commit('setFolderContent', payload);
    }
  },

  getters: {
    getFilesystem(state) {
      return state.filesystem;
    },
    getFolderContent(state) {
      return state.folderContent;
    }
  }
};
