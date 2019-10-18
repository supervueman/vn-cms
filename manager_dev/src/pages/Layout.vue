<template lang="pug">
  v-flex(v-if="r.is_layouts_read")
    .body-2.mb-12.mt-2 {{d.layout}}: {{layout.title}}
    v-layout.wrap
      layout-view(
        :layout="layout"
        operationType="update"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import panelMixin from "@/mixins/panelMixin";

// Comnponents
import Fields from "@/components/Layout/Fields";
import LayoutView from "@/components/Layout/View";

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

  mixins: [accessMixin, panelMixin],

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
