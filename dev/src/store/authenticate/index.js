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
      const data = requestDataHandler('POST', '/authenticate/login', payload);

      const result = await axios(data);

      if (result !== undefined) {
        localStorage.setItem('access_token', result.data.access_token);
        localStorage.setItem('uid', result.data.uid);

        this.dispatch('profile/fetch');
      }
    },
    async logout({
      commit
    }) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('uid');
      this.dispatch('profile/clear');
    }
  },
  getters: {}
};
