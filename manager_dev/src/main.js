import Vue from 'vue';
import '@/core/plugins/vuetify';
import commonComponentsRequire from '@/functions/commonComponentsRequire';
import App from './App.vue';
import router from './connector/index.route.js';
import '@mdi/font/css/materialdesignicons.css';
import {
  store
} from './connector/index.store.js';
import axios from 'axios';
import vuetify from './plugins/vuetify';
import VueMeta from 'vue-meta'

Vue.use(VueMeta);

// Mixins
import dictionaryMixin from '@/core/mixins/dictionaryMixin';
import baseMixin from '@/core/mixins/baseMixin';
import accessMixin from '@/core/mixins/accessMixin';
import rulesMixin from '@/core/mixins/rules';

Vue.mixin(dictionaryMixin);
Vue.mixin(baseMixin);
Vue.mixin(accessMixin);
Vue.mixin(rulesMixin);

commonComponentsRequire();

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL_PROD : process.env.VUE_APP_API_BASE_URL;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
