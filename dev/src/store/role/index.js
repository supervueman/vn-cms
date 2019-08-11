import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios';

const role = {
  slug: '',
  title: '',
  rang: ''
};
const clearRole = {
  slug: '',
  title: '',
  rang: ''
}

export default {
  namespaced: true,
  state: {
    role,
    roles: []
  },
  mutations: {
    set(state, payload) {
      state.role = payload;
    },
    setAll(state, payload) {
      state.roles = payload;
    }
  },
  actions: {
    async findByPk({
      commit
    }, payload) {
      const data = requestDataHandler('GET', `/roles/role/${payload}`)

      const result = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Не найдено!',
          isActive: true
        });
      });

      if (result !== undefined && result.status === 200) {
        commit('set', result.data);
      }
    },

    async findOne({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/roles/findone', undefined, payload);

      const result = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Не найдено!',
          isActive: true
        });
      });

      if (result !== undefined && result.status === 200) {
        commit('set', result.data);
      }
    },

    async create({
      commit
    }, payload) {
      const data = requestDataHandler('POST', '/roles/create', payload);

      const result = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка при создании!',
          isActive: true
        });
      });

      if (result !== undefined && result.status === 200) {
        commit('set', result.data);
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
      const data = requestDataHandler('PUT', `/roles/update`, payload);

      const result = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка при сохранении!',
          isActive: true
        });
      });

      if (result !== undefined && result.status === 200) {
        commit('set', result.data);
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
      const data = requestDataHandler('DELETE', '/roles/remove', {
        id: payload
      });

      const result = await axios(data).catch(err => {
        this.dispatch("notification/fetch", {
          type: "error",
          message: 'Ошибка при удалени!',
          isActive: true
        });
      });

      if (result !== undefined && result.status === 200) {
        this.dispatch('role/clear');
        this.dispatch("notification/fetch", {
          type: "success",
          message: 'Успешно удалено!',
          isActive: true
        });
      }
    },

    async findAll({
      commit
    }, payload) {
      const data = requestDataHandler('GET', '/roles', undefined, payload);

      const result = await axios(data);

      if (result !== undefined && result.status === 200) {
        commit('setAll', result.data);
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
    },

    clear({
      commit
    }) {
      commit('set', clearRole);
    }
  },
  getters: {
    get(state) {
      return state.role;
    },
    getAll(state) {
      return state.roles;
    }
  }
};
