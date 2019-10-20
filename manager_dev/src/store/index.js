import Vue from 'vue';
import Vuex from 'vuex';

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

import notification from './common/notification';
import preloader from './common/preloader';
import base from './common/base';
// import profile from './profile';
// import authenticate from './authenticate';
// import resource from './resource';
// import filesystem from './modules/filesystem.store';
// import layout from './layout';
// import field from './field';
import fieldCategory from './fieldCategory';
import additionalField from './additionalField';
// import user from './user';
// import role from './role';
import systemSetting from './systemSettings';
// import dictionary from './dictionary';
import mail from './mail';

import modules from './modules';

export const store = new Vuex.Store({
  modules: {
    notification,
    preloader,
    base,
    // authenticate,
    // profile,
    // resource,
    // filesystem,
    // layout,
    // field,
    fieldCategory,
    additionalField,
    // user,
    // role,
    systemSetting,
    // dictionary,
    mail,
    ...modules
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
