import Vuex from 'vuex';
import notification from './common/notification';
import resource from './resource';

const store = () => {
  return new Vuex.Store({
    modules: {
      notification,
      resource
    }
  })
}

export default store;
