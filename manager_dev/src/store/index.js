import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import notification from './common/notification';
import preloader from './common/preloader';
import profile from './profile';
import authenticate from './authenticate';
import resource from './resource';
import filesystem from './filesystem';
import layout from './layout';
import field from './field';
import additionalField from './additionalField';
import user from './user';
import role from './role';
import mail from './mail';

export const store = new Vuex.Store({
  modules: {
    notification,
    preloader,
    authenticate,
    profile,
    resource,
    filesystem,
    layout,
    field,
    additionalField,
    user,
    role,
    mail
  }
});
