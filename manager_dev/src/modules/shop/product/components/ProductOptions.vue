<template lang="pug">
	v-card-text
		v-tooltip(top)
			template(v-slot:activator="{ on }")
				v-text-field(
					v-model="product.article"
					:label="`${d.article || 'Article'}:`"
					v-on="on"
				)
			span article

		v-layout
			v-flex.mr-2
				v-tooltip(top)
					template(v-slot:activator="{ on }")
						v-text-field(
							v-model="product.price"
							:label="`${d.price || 'Price'}:`"
							v-on="on"
						)
					span price
			v-flex.ml-2
				v-tooltip(top)
					template(v-slot:activator="{ on }")
						v-text-field(
							v-model="product.count"
							:label="`${d.count || 'Count'}:`"
							v-on="on"
						)
					span count

		v-layout
			v-flex.mr-2
				v-tooltip(top)
					template(v-slot:activator="{ on }")
						v-text-field(
							v-model="product.weight"
							:label="`${d.weight || 'Weight'}:`"
							v-on="on"
						)
					span weight

			v-flex.ml-2
				v-tooltip(top)
					template(v-slot:activator="{ on }")
						v-text-field(
							v-model="product.size"
							:label="`${d.size || 'Size'}:`"
							v-on="on"
						)
					span size

		v-layout
			v-checkbox.mr-8(
				v-model="product.popular"
				:label="`${d.popular || 'Popular'}`"
			)

			v-checkbox.mr-8(
				v-model="product.new"
				:label="`${d.new || 'New'}`"
			)

			v-checkbox(
				v-model="product.in_stock"
				:label="`${d.in_stock || 'In stock'}`"
			)
</template>

<script>
export default {
  name: "ProductOptions",

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    }
  }
};
</script>
