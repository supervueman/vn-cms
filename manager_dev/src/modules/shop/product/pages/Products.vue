<template lang="pug">
  v-layout(v-if="adminAccess || managerAccess")
    v-flex
      v-flex
        .body-2.mb-12.mt-2 {{d.products || 'Products'}}
      v-card
        shop-toolbar
        v-toolbar
          v-spacer
          v-btn(
            to="/shop/product-create"
            color="primary"
          ) {{d.resource_create || 'Создать ресурс'}}
        products
</template>

<script>
// Components
import ShopToolbar from "../../components/ShopToolbar";
import Products from "../components/Products";

export default {
  name: "ProductsPage",

  metaInfo() {
    return {
      title: `${this.d.products || "Products"}`
    };
  },

  components: {
    Products,
    ShopToolbar
  }
};
</script>
