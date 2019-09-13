import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async login({
      commit
    }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler('POST', '/authenticate/login', payload);

      const response = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка авторизации!',
          isActive: true
        });
      });

      if (response !== undefined && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('uid', response.data.uid);

        await this.dispatch('profile/findByAccessToken', {
          filter: {
            include: [{
              model: '$resource'
            }]
          }
        });
      }
    },
    async logout({
      commit
    }) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('uid');
      localStorage.removeItem('x-api-key');
      this.dispatch('profile/clear');
    }
  },
  getters: {}
};
