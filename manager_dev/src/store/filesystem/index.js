import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

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
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('GET', '/filesystem', undefined);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
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
    },

    async createDir({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('POST', '/filesystem/create-dir', payload);
      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Директория успешно создана!',
          isActive: true
        });
      }
    },

    async upload({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('POST', '/filesystem/upload', payload.formData, payload.query);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Файлы успешно загружены!',
          isActive: true
        });
      }
    },

    async removeFile({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('DELETE', '/filesystem/remove-file', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Файл успешно удален!',
          isActive: true
        });
      }
    },

    async removeDir({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('DELETE', '/filesystem/remove-dir', payload);

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'success',
          message: 'Директория успешно удалена!',
          isActive: true
        });
      }
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
