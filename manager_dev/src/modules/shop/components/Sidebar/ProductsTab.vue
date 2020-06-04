<template lang="pug">
	v-flex.slidebar
		v-app-bar(flat height="50")
			v-tooltip(top v-if="r.is_product_create")
				template(v-slot:activator="{ on }")
					v-btn(
						slot="activator"
						text
						icon
						color="primary"
						to="/shop/product-create"
						v-on="on"
					)
						v-icon add_circle_outline
				span {{d.create_product || 'Create product'}}

			v-tooltip(top v-if="r.is_product_read")
				template(v-slot:activator="{ on }")
					v-btn(
						slot="activator"
						text
						icon
						color="primary"
						v-on="on"
						@click="reloadProducts"
					)
						v-icon replay
				span {{d.reload || 'Reload'}}
		.resource--tree
			v-expansion-panels(
				accordion
				multiple
			)
				v-expansion-panel(
					v-for="context in contexts"
					:key="context.id"
				)
					v-expansion-panel-header {{context.title}} ({{context.slug}})
					v-expansion-panel-content
						v-treeview(
							:items="context.products"
							transition
							open-all
							:key="componentKey"
						)
							template(v-slot:prepend="{ item, active }")
								.link-wrapper(@click="fetchProducts(item)")
									router-link(:to="`/shop/products/${item.id}`") {{item.title}} ({{item.id}})
</template>

<script>
export default {
  name: "ProductsTab",

  data: () => ({
    componentKey: 0
  }),

  computed: {
    contexts() {
      return this.$store.getters["shop/product/getSidebarContexts"];
    }
  },

  methods: {
    async reloadProducts() {
      await this.$store.dispatch("shop/product/findSidebarContexts", {
        query: {
          filter: {
            include: [
              {
                association: "products",
                where: {
                  level: 1,
                  lang: this.$store.getters["base/getMainLang"]
                }
              }
            ]
          }
        }
      });
    },

    async fetchProducts(item) {
      if (!item.children) {
        const bool = await this.$store.dispatch(
          "shop/product/insertToSidebarProducts",
          {
            query: {
              filter: {
                where: {
                  parentId: item.id
                }
              }
            }
          }
        );

        if (bool) {
          item.children = this.$store.getters[
            "shop/product/getInsertSidebarProducts"
          ];
          this.componentKey += 1;
        }
      }
    }
  }
};
</script>

<style lang="sass">
.v-navigation-drawer__content
	overflow: hidden
.slidebar
	overflow: auto
	width: 100%
	height: calc(100vh - 165px)
	.v-expansion-panel::before
		border: none!important
		box-shadow: none
	.v-expansion-panel
		border: none!important
	.v-expansion-panels
		border-radius: 0!important
	.v-expansion-panel-header
		background-color: lightgray!important
	.v-expansion-panel-content__wrap
		padding: 0

	.v-treeview-node__root
		display: flex
	.v-treeview-node__content
		height: 100%
		flex: 1
		a
			width: 100%
			display: block
			padding: 5px
			text-decoration: none
			color: #000
	.link-wrapper
		width: 100%
	.router-link-exact-active, .router-link-active
		background-color: lightgray
		width: 100%
</style>
