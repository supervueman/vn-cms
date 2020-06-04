import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import notification from '@/core/store/notification';
import preloader from '@/core/store/preloader';
import base from '@/core/store/base';

import systemsetting from '@/core/modules/systemsetting/store/index.store';
import lang from '@/core/modules/lang/store/index.store';
import lexicon from '@/core/modules/lexicon/store/index.store';
import context from '@/core/modules/context/store/index.store';
import role from '@/core/modules/role/store/index.store';
import user from '@/core/modules/user/store/index.store';
import mail from '@/core/modules/mail/store/index.store';
import profile from '@/core/modules/profile/store/index.store';
import authenticate from '@/core/modules/authenticate/store/index.store';
import fieldcategory from '@/core/modules/fieldcategory/store/index.store';
import field from '@/core/modules/field/store/index.store';
import layout from '@/core/modules/layout/store/index.store';
import resourcetype from '@/core/modules/resourcetype/store/index.store';
import resource from '@/core/modules/resource/store/index.store';
import additionalfield from '@/core/modules/additionalfield/store/index.store';
import filesystem from '@/core/modules/filesystem/store/index.store';

Vue.use(Vuex);

/**
 * Automatically imports all the modules and exports as a single module object
 */
const modules = {};

const requireModule = require.context('../modules', true, /\.store\.js$/);

requireModule.keys().forEach((filename) => {
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename.replace(/(\.\/|\/store\/\index\.store\.js)/g, '');

  modules[moduleName] =
    requireModule(filename).default || requireModule(filename);
});

const debug = false; // process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store({
  modules: {
    notification,
    preloader,
    base,
    systemsetting,
    lang,
    lexicon,
    context,
    role,
    user,
    mail,
    profile,
    authenticate,
    fieldcategory,
    field,
    layout,
    resourcetype,
    resource,
    additionalfield,
    filesystem,
    ...modules
  },
  strict: false,
  plugins: debug ? [createLogger()] : []
});
