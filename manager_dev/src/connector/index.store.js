import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import notification from '@/core/store/notification';
import preloader from '@/core/store/preloader';
import base from '@/core/store/base';

Vue.use(Vuex);

/**
 * Automatically imports all the modules and exports as a single module object
 */
const modules = {};

const requireModule = require.context('../modules', true, /\.store\.js$/);

requireModule.keys().forEach(filename => {

  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename
    .replace(/(\.\/|\/store\/\index\.store\.js)/g, '');


  modules[moduleName] = requireModule(filename).default || requireModule(filename);
});


const debug = false; // process.env.NODE_ENV !== 'production';


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
