<template lang="pug">
	v-card.mb-2(outlined)
		v-card-text
			v-layout(
				v-for="(item, i) in product.modificators"
				:key="i"
			)
				v-flex
					v-layout.d-flex.align-center
						h3 {{item.title}}
						v-btn(
							text
							fab
							color="primary"
							@click="removeModificator(item.slug)"
						)
							v-icon delete
					v-layout
						ImageField.mr-5(
							v-model="item.image"
							:label="`${d.image || 'Image'}`"
						)
						v-text-field.mr-5(
							v-model="item.price"
							type="number"
							:label="`${d.price || 'Price'}:`"
						)
						v-text-field(
							v-model="item.weight"
							:label="`${d.weight || 'Weight'}:`"
						)
			modificators
</template>

<script>
import Modificators from "../components/Modificators";
import ImageField from "../../../../core/components/ImageField";

export default {
  name: "ProductModificatorsComponent",

  components: {
    Modificators,
    ImageField
  },

  data: () => ({
    modificators: []
  }),

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    }
  },

  methods: {
    removeModificator(slug) {
      this.product.modificators = this.product.modificators.filter(
        el => el.slug !== slug
      );
    }
  }
};
</script>
