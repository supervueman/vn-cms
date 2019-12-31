import requestDataHandler from '@/core/plugins/requestDataHandler';
import axios from 'axios';

const actions = {
  async loginByEmail({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'POST',
      '/authenticate/login-by-email',
      payload
    );

    const response = await axios(data).catch(err => {
      this.dispatch('notification/fetch', {
        type: 'error',
        message: 'Error',
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('id', response.data.id);

      await this.dispatch('profile/findByAccessToken');
    }
  },

  async loginByPhone({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler(
      'POST',
      '/authenticate/login-by-phone',
      payload
    );

    const response = await axios(data).catch(err => {
      this.dispatch('notification/fetch', {
        type: 'error',
        message: 'Error',
        isActive: true
      });
    });

    if (typeof response === 'object' && response.status === 200) {
      this.dispatch('preloader/fetch', false);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('id', response.data.id);

      await this.dispatch('profile/findByAccessToken');
    }
  },

  async logout({
    commit
  }) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    localStorage.removeItem('x-api-key');
    this.dispatch('profile/clear');
  },
};

export default actions;
