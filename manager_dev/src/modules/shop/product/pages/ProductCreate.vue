<template lang="pug">
  v-flex(v-if="r.is_product_create")
    .body-2.mt-2 {{d.product_creation}}
      v-layout.wrap.pt-12
        product-view(
          :product="product"
          operationType="create"
        )
</template>

<script>
// Components
import ProductView from "../components/View";

export default {
  name: "ProductCreatePage",

  metaInfo() {
    return {
      title: `${this.d.product_create || "Product create"}`
    };
  },

  components: {
    ProductView
  },

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    }
  },

  async mounted() {
    if (
      this.$route.query.translationId !== "" &&
      this.$route.query.translationId !== null &&
      this.$route.query.translationId !== undefined
    ) {
      await this.$store.dispatch("shop/product/findByPk", {
        params: {
          id: this.$route.query.translationId
        },
        query: {
          filter: {
            include: [
              {
                association: "layout",
                include: ["fields"]
              },
              "additionalfields",
              {
                association: "parent",
                include: ["translations"]
              },
              "translations"
            ]
          }
        }
      });
      this.$store.dispatch("shop/product/clear");
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("shop/product/clear");
    next();
  }
};
</script>
