import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';
import router from '@/connector/index.route.js';

import profile from '../../user/models/user';
import rules from '../../role/models/rules_default';

const rulesParse = {
  ...rules
};
for (const rule in rulesParse) {
  rulesParse[rule] = rulesParse[rule].value;
}

const actions = {
  async findByAccessToken({
    commit
  }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('GET', '/profile');

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
      // router.push('/');
    });

    if (response !== undefined && response.status === 200) {
      commit('SET_RULES', response.data.role.rules);
      this.dispatch('preloader/fetch', false);
      localStorage.setItem('x-api-key', response.data.token);

      const dataSystemSetting = requestDataHandler('GET', '/systemsettings/findone', undefined, {
        filter: {
          where: {
            slug: 'main_lang'
          }
        }
      });

      const responseSystemSetting = await axios(dataSystemSetting).catch(err => {
        this.dispatch('preloader/fetch', true);
        this.dispatch("notification/fetch", {
          type: "error",
          message: `${err}`,
          isActive: true
        });
      });

      if (responseSystemSetting !== undefined && responseSystemSetting.status === 200) {
        this.dispatch('base/setMainLang', JSON.parse(responseSystemSetting.data.setting).value);
        if (!localStorage.getItem('admin-panel-lang')) {
          localStorage.setItem('admin-panel-lang', JSON.parse(responseSystemSetting.data.setting).value);
        }

        await this.dispatch("dictionary/findOne", {
          query: {
            filter: {
              where: {
                lang: localStorage.getItem("admin-panel-lang") || JSON.parse(responseSystemSetting.data.setting).value
              }
            }
          }
        });

        const dataResources = requestDataHandler('GET', '/resources', undefined, {
          filter: {
            where: {
              level: 1,
              userId: response.data.id,
              lang: JSON.parse(responseSystemSetting.data.setting).value
            }
          }
        });

        const responseResources = await axios(dataResources).catch(err => {
          this.dispatch('preloader/fetch', true);
          this.dispatch("notification/fetch", {
            type: "error",
            message: `${err}`,
            isActive: true
          });
        });

        commit('SET', response.data);

        if (responseResources !== undefined && responseResources.status === 200) {
          this.dispatch('preloader/fetch', false);
          commit('SET_RESOURCES', responseResources.data);
        }
      }

    }
  },

  async createByEmail({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/profile/create-by-email', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('user/set', response.data);
      router.push(`/users/${response.data.id}`)
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
    }
  },

  async update({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/profile/update', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('profile/set', response.data);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
    }
  },

  async changePassword({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('PUT', '/profile/password-change', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Успешно сохранено!',
        isActive: true
      });
    }
  },

  async resetPasswordByEmailRequest({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/profile/password-reset-by-email-request', payload.body);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Success',
        isActive: true
      });
    }
  },

  async resetPasswordByEmail({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/profile/password-reset-by-email', payload.body, undefined, payload.headers);

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "success",
        message: 'Success',
        isActive: true
      });
    }
  },

  async remove({
    commit
  }) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('DELETE', '/profile/remove');

    const response = await axios(data).catch(err => {
      this.dispatch('preloader/fetch', false);
      this.dispatch("notification/fetch", {
        type: "error",
        message: `${err}`,
        isActive: true
      });
    });

    if (response !== undefined && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      this.dispatch('authenticate/logout');
    }
  },

  set({
    commit
  }, payload) {
    commit('SET', payload);
  },

  setResources({
    commit
  }, payload) {
    commit('SET_RESOURCES', payload);
  },

  clear({
    commit
  }) {
    commit('SET', {
      ...profile
    })
  },

  clearRules({
    commit
  }) {
    commit('SET_RULES', JSON.stringify({
      ...rulesParse
    }));
  },

  clearResources({
    commit
  }) {
    commit('SET_RESOURCES', []);
  },
};

export default actions;
