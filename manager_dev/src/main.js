import Vue from 'vue';
import './plugins/vuetify'
import commonComponentsRequire from '@/functions/commonComponentsRequire';
import App from './App.vue';
import router from './routers';
import {
  store
} from './store';
import axios from 'axios';

commonComponentsRequire();

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
