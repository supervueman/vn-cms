<template lang="pug">
	v-flex(v-if="r.is_product_read")
		v-layout
			.body-2.mt-2.mb-12 {{d.product || 'Product'}}: {{product.title}} ({{product.id}})
			v-spacer
			product-langs-menu
		v-tabs(
			slider-color="primary"
			grow
		)
			v-tab {{d.common_data || 'Common data'}}
			v-tab-item.mt-3
				product-tab
				v-flex.xs12.md7.pr-2
					.d-flex.justify-center
						v-btn.mb-2(
							text
							color="error"
							depressed
							@click="isRemoveDialog = true"
						) {{d.remove || 'Remove'}}
						v-dialog(
							v-model="isRemoveDialog"
							max-width="500px"
						)
							remove-confirm(
								@remove="remove"
								:isActive.sync="isRemoveDialog"
								:name="product.title"
							)
			v-tab {{d.fields || 'Fields'}}
			v-tab-item.mt-3
				fields-tab
			v-tab {{d.products || 'Products'}}
			v-tab-item
				products-tab.mt-3
			v-tab(
				v-if="r.is_productmodificator_read"
			) {{d.modificators || 'Modificators'}}
			v-tab-item(v-if="r.is_productmodificator_read")
				product-modificators-tab.mt-3
</template>

<script>
import findByPkQuery from "../query/findByPkQuery";

// Components
import ProductTab from "../components/ProductTab";
import FieldsTab from "../components/FieldsTab";
import ProductsTab from "../components/ProductsTab";
import ProductModificatorsTab from "../components/ProductModificatorsTab";
import ProductLangsMenu from "../components/ProductLangsMenu";

export default {
  name: "Resource",

  components: {
    ProductTab,
    FieldsTab,
    ProductsTab,
    ProductModificatorsTab,
    ProductLangsMenu
  },

  metaInfo() {
    return {
      title: `${this.d.product || "Product"}: ${this.product.title}`
    };
  },

  data() {
    return {
      isRemoveDialog: false
    };
  },

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    }
  },

  async mounted() {
    const findByPkQueryData = findByPkQuery(this.$route.params.id);
    const bool = await this.$store.dispatch(
      "shop/product/findByPk",
      findByPkQueryData
    );

    if (bool) {
      await this.$store.dispatch("shop/product/findAll", {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
            order: [["createdAt", "DESC"]],
            where: {
              level: this.product.level + 1,
              parentId: this.product.id,
              lang: this.product.lang
            }
          }
        }
      });
      await this.$store.dispatch("shop/product/count", {
        query: {
          filter: {
            where: {
              level: this.product.level + 1,
              parentId: this.product.id,
              lang: this.product.lang
            }
          }
        }
      });
    }
  },

  methods: {
    async remove() {
      if (this.r.is_product_delete) {
        const bool = await this.$store.dispatch("shop/product/remove", {
          params: { id: this.product.id }
        });

        if (bool) {
          this.$router.push("/");
        }
      }
    }
  },

  async beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("shop/product/clear");
    const findByPkQueryData = findByPkQuery(to.params.id);
    const bool = await this.$store.dispatch(
      "shop/product/findByPk",
      findByPkQueryData
    );

    if (bool) {
      await this.$store.dispatch("shop/product/findAll", {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
            order: [["createdAt", "DESC"]],
            where: {
              level: this.product.level + 1,
              parentId: this.product.id,
              lang: this.product.lang
            }
          }
        }
      });
      await this.$store.dispatch("shop/product/count", {
        query: {
          filter: {
            where: {
              level: this.product.level + 1,
              parentId: this.product.id,
              lang: this.product.lang
            }
          }
        }
      });
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("shop/product/clear");
    next();
  }
};
</script>

<style lang="sass">
.theme--light.v-tabs-items
  background-color: transparent
</style>
