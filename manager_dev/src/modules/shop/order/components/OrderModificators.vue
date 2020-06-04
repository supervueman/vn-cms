<template lang="pug">
	v-card(outlined)
		v-card-text
			v-layout(
				v-for="(elem, i) in order.modificators"
				:key="i"
			)
				v-text-field(
					v-model="elem.value"
					:label="`${elem.title}. ${d.operator || 'Operator'}: '${elem.operator}'`"
				)
				v-icon(
					@click="removeModificator(elem.slug)"
				) delete

		Modificators
</template>

<script>
import Modificators from "./Modificators";

export default {
  name: "OrderModificatorsComponent",

  components: {
    Modificators
  },

  computed: {
    order() {
      return this.$store.getters["shop/order/get"];
    }
  },

  methods: {
    removeModificator(slug) {
      this.order.modificators = this.order.modificators.filter(
        el => el.slug !== slug
      );
    }
  }
};
</script>
