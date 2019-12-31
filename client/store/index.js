import Vuex from 'vuex';
import serverInit from './serverInit';
import notification from './notification';
import dictionary from './dictionary';

const store = () => {
  return new Vuex.Store({
    modules: {
      serverInit,
      notification,
      dictionary
    }
  });
};

export default store;
