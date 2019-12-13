import Vue from 'vue';

import baseMixin from '@/core/mixins/baseMixin';
import aceMixin from '@/core/mixins/aceMixin';

export default () => {
  Vue.mixin(baseMixin);
  Vue.mixin(aceMixin);
};
