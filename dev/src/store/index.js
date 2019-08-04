import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import notification from './common/notification';
import profile from './profile';
import authenticate from './authenticate';
import resource from './resource';
import filesystem from './filesystem';
import layout from './layout';
import field from './field';
import user from './user';
import role from './role';

export const store = new Vuex.Store({
  modules: {
    notification,
    authenticate,
    profile,
    resource,
    filesystem,
    layout,
    field,
    user,
    role
  }
});
