import Vue from 'vue';
import './plugins/vuetify'
import commonComponentsRequire from '@/functions/commonComponentsRequire';
import App from './App.vue';
import router from './routers';
import '@mdi/font/css/materialdesignicons.css';
import {
  store
} from './store';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import dictionaryMixin from './mixins/dictionaryMixin';

commonComponentsRequire();

Vue.mixin(dictionaryMixin);

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL_PROD : process.env.VUE_APP_API_BASE_URL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
