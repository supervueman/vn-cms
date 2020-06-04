<template lang="pug">
  v-flex
    v-toolbar(flat)
      v-spacer
</template>

<script>
// Components
import ShopToolbar from "../components/ShopToolbar";

export default {
  name: "ShopPage",

  metaInfo() {
    return {
      title: `${this.d.orders || "Orders"}`
    };
  },

  components: {
    ShopToolbar
  },

  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 10,
      isOpenItem: false
    };
  }
};
</script>
