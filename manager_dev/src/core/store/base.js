import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

export default {
  state: {
    mainLang: 'en',
  },
  mutations: {
    SET_ADMIN_LANG(state, payload) {
      state.mainLang = payload;
    },
  },
  actions: {
    async fetchMainLang({
      commit
    }) {
      const data = requestDataHandler('GET', '/systemsettings/findone', undefined, {
        filter: {
          where: {
            slug: 'main_lang'
          }
        }
      });

      const response = await axios(data).catch(err => {
        this.dispatch('preloader/fetch', false);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
        return false;
      });

      if (typeof response === 'object' && response.status === 200) {
        if (!localStorage.getItem('admin-panel-lang')) {
          localStorage.setItem('admin-panel-lang', JSON.parse(response.data.setting).value);
        }
        commit('SET_ADMIN_LANG', JSON.parse(response.data.setting).value);
      }
    },

    setMainLang({
      commit
    }, payload) {
      commit('SET_ADMIN_LANG', payload);
    },
  },
  getters: {
    getMainLang(state) {
      return state.mainLang;
    }
  },
  namespaced: true
};
