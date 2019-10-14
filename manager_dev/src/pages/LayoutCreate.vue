<template lang="pug">
  v-flex(v-if="r.is_layout_create")
    .body-2.mb-12.mt-2 {{d.layout_creation}}
    v-layout.wrap
      layout-view(
        :layout="layout"
        operationType="create"
      )
</template>

<script>
// Components
import LayoutView from "@/components/Layout/View";

// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "LayoutCreatePage",

  components: {
    LayoutView
  },

  mixins: [accessMixin],

  computed: {
    layout() {
      return this.$store.getters["layout/get"];
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("layout/clear");
    next();
  }
};
</script>
