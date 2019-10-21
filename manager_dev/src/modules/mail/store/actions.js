import requestDataHandler from '@/functions/requestDataHandlerWithAxios';
import axios from 'axios'

const actions = {
  async send({
    commit
  }, payload) {
    this.dispatch('preloader/fetch', true);
    const data = requestDataHandler('POST', '/mail', payload);

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
        message: 'Сообщение успешно отправлено!',
        isActive: true
      });
    }
  },
};

export default actions;
