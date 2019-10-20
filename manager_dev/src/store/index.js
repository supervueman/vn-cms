import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

import notification from './common/notification';
import preloader from './common/preloader';
import base from './common/base';

import modules from './modules';

export const store = new Vuex.Store({
  modules: {
    notification,
    preloader,
    base,
    ...modules
  },
  strict: false,
  plugins: debug ? [createLogger()] : [],
});
