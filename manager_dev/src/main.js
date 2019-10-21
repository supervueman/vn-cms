import Vue from 'vue';
import App from './App.vue';
import router from './connector/index.route.js';
import vuetify from '@/core/plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import vuemeta from 'vue-meta';
import {
  store
} from './connector/index.store.js';
import axios from 'axios';
import core_mixins from '@/core/mixins'
import commonComponentsRequire from '@/core/plugins/components';

Vue.use(vuemeta);

commonComponentsRequire();
core_mixins();

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL_PROD : process.env.VUE_APP_API_BASE_URL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
