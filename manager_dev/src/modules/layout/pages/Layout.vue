<template lang="pug">
  v-flex(v-if="r.is_layouts_read")
    .body-2.mb-12.mt-2 {{d.layout}}: {{layout.title}} ({{layout.id}})
    v-layout.wrap
      layout-view(
        :layout="layout"
        operationType="update"
      )
</template>

<script>
// Comnponents
import Fields from "../components/Fields";
import LayoutView from "../components/View";

export default {
  name: "LayoutPage",

  metaInfo() {
    return {
      title: `${this.d.layout || "Layout"}: ${this.layout.title}`
    };
  },

  components: {
    Fields,
    LayoutView
  },

  computed: {
    layout() {
      return this.$store.getters["layout/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/findByPk", {
      params: { id: this.$route.params.id }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("layout/clear");
    next();
  }
};
</script>
