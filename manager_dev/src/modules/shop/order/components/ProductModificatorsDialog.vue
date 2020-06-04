<template lang="pug">
	v-card.pt-5.pb-0
		v-card-text.pb-0
			v-layout.d-flex.align-center.justify-space-between.pb-5(
				v-for="item in orderProductModificators"
				:key="`${item.slug}-1`"
			)
				h3 {{item.title}} {{item.value}}
				v-icon(
					color="primary"
					@click="remove(item)"
				) delete

			v-divider.mb-5(v-if="orderProductModificators.length > 0")

			v-layout.d-flex.align-center.justify-space-between.pb-5(
				v-for="item in modificators"
				:key="item.slug"
			)
				h3 {{item.title}} {{item.value}}
				v-btn(
					color="primary"
					depressed
					@click="add(item)"
				) {{d.add || 'Add'}}
</template>

<script>
export default {
  name: "ProductModificatorsDialogComponent",

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    modificators() {
      if (this.item && this.item.modificators) {
        return JSON.parse(this.item.modificators);
      }
      return [];
    },

    orderProductModificators() {
      return this.item.OrderProduct.modificators;
    }
  },

  methods: {
    add(modificator) {
      const existModificator = this.item.OrderProduct.modificators.find(
        el => el.slug === modificator.slug
      );

      if (!existModificator) {
        this.item.OrderProduct.modificators.push(modificator);
      }
    },

    remove(modificator) {
      this.item.OrderProduct.modificators = this.item.OrderProduct.modificators.filter(
        el => el.slug !== modificator.slug
      );
    }
  }
};
</script>
