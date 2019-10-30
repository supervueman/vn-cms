import Vue from 'vue';

import dictionaryMixin from '@/core/mixins/dictionaryMixin';
import baseMixin from '@/core/mixins/baseMixin';
import accessMixin from '@/core/mixins/accessMixin';
import rulesMixin from '@/core/mixins/rules';
import aceMixin from '@/core/mixins/aceMixin';

export default () => {
  Vue.mixin(dictionaryMixin);
  Vue.mixin(baseMixin);
  Vue.mixin(accessMixin);
  Vue.mixin(rulesMixin);
  Vue.mixin(aceMixin);
};
