import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import notification from './common/notification';
import preloader from './common/preloader';
import base from './common/base';
import profile from './profile';
import authenticate from './authenticate';
import resource from './resource';
import filesystem from './filesystem';
import layout from './layout';
import field from './field';
import fieldCategory from './fieldCategory';
import additionalField from './additionalField';
import user from './user';
import role from './role';
import systemSetting from './systemSettings';
import dictionary from './dictionary';
import mail from './mail';

export const store = new Vuex.Store({
  modules: {
    notification,
    preloader,
    base,
    authenticate,
    profile,
    resource,
    filesystem,
    layout,
    field,
    fieldCategory,
    additionalField,
    user,
    role,
    systemSetting,
    dictionary,
    mail
  }
});
