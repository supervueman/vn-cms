<template lang="pug">
  v-flex(v-if="managerAccess") {{resource}}
    .body-2.mt-2 {{d.resource_creation}}
      v-layout.wrap.pt-12
        resource-view(
          :resource="resource"
          operationType="create"
        )
</template>

<script>
// Components
import ResourceView from "@/components/Resource/View";

// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "ResourceCreatePage",

  components: {
    ResourceView
  },

  mixins: [accessMixin],

  computed: {
    resource() {
      return this.$store.getters["resource/get"];
    }
  },

  async mounted() {
    if (
      this.$route.query.translationId !== "" &&
      this.$route.query.translationId !== null &&
      this.$route.query.translationId !== undefined
    ) {
      await this.$store.dispatch("resource/findByPk", {
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
      this.$store.dispatch("resource/clear");
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("resource/clear");
    next();
  }
};
</script>
