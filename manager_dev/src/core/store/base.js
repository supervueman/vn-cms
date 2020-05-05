import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

export default {
  state: {
    mainLang: 'en',
    adminLang: 'en',
    lang: 'en',
    lexicons: []
  },

  mutations: {
    SET_MAIN_LANG(state, payload) {
      state.mainLang = payload;
    },
    SET_ADMIN_LANG(state, payload) {
      state.adminLang = payload;
    },
    SET_LANG(state, payload) {
      state.lang = payload;
    },
    SET_LEXICONS(state, payload) {
      state.lexicons = payload;
    }
  },

  actions: {
    async fetchMainLang({ commit }) {
      const data = requestDataHandler(
        'GET',
        '/systemsettings/findone',
        undefined,
        {
          filter: {
            where: {
              slug: 'main_lang'
            }
          }
        }
      );

      const response = await axios(data).catch((err) => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
        return false;
      });

      if (typeof response === 'object' && response.status === 200) {
        const lang = JSON.parse(response.data.setting).value;

        commit('SET_MAIN_LANG', lang);

        if (!localStorage.getItem('admin-panel-lang')) {
          localStorage.setItem('admin-panel-lang', lang);
          commit('SET_ADMIN_LANG', lang);
        } else {
          commit(
            'SET_ADMIN_LANG',
            localStorage.getItem('admin-panel-lang', lang)
          );
        }
      }
    },

    async fetchLang({ commit }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler(
        'GET',
        '/langs/findone',
        undefined,
        payload.query
      );

      const response = await axios(data).catch((err) => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (typeof response === 'object' && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('SET_LANG', response.data);
      }
    },

    async fetchLexicons({ commit }, payload) {
      this.dispatch('preloader/fetch', true);
      const data = requestDataHandler(
        'GET',
        '/lexicons',
        undefined,
        payload.query
      );

      const response = await axios(data).catch((err) => {
        this.dispatch('preloader/fetch', false);
        this.dispatch('notification/fetch', {
          type: 'error',
          message: `${err}`,
          isActive: true
        });
      });

      if (typeof response === 'object' && response.status === 200) {
        this.dispatch('preloader/fetch', false);
        commit('SET_LEXICONS', response.data);
      }
    },

    setAdminLang({ commit }, payload) {
      commit('SET_ADMIN_LANG', payload);
    }
  },

  getters: {
    getMainLang(state) {
      return state.mainLang;
    },
    getAdminLang(state) {
      return state.adminLang;
    },
    getLang(state) {
      return state.lang;
    },
    getLexicons(state) {
      return state.lexicons;
    }
  },

  namespaced: true
};
