import Vue from 'vue';
import App from './App.vue';
import vuetify from '@/core/plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import vuemeta from 'vue-meta';
import { store } from './connector/index.store.js';
import router from './connector/index.route.js';
import layout from './connector/index.layout.js';
import core_mixins from '@/core/mixins';
import core_components from '@/core/plugins/components';

import axios from '@/core/plugins/axios';

import DefaultLayout from './layouts/layout-default.vue';

Vue.component('layout-default', DefaultLayout);

Vue.use(vuemeta);

core_components();
core_mixins();
layout();
axios();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
