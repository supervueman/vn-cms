import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import notification from '@/store/common/notification';
import preloader from '@/store/common/preloader';
import base from '@/store/common/base';

Vue.use(Vuex);

/**
 * Automatically imports all the modules and exports as a single module object
 */
const modules = {};

const requireModule = require.context('../modules', true, /\.store\.js$/);

requireModule.keys().forEach(filename => {

  console.log(filename)

  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename
    .replace(/(\.\/|\/store\/\index\.store\.js)/g, '');


  modules[moduleName] = requireModule(filename).default || requireModule(filename);

  // console.log(modules)
});

console.log(modules)

// export default modules;

const debug = process.env.NODE_ENV !== 'production';



// import modules from './modules';

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
