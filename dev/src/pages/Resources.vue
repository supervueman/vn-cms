<template lang="pug">
  v-flex(v-if="adminAccess || managerAccess")
    .body-2.mb-5 Ресурсы
    resources
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import Resources from "@/components/Resource/Resources";

export default {
  name: "ResourcesPage",

  components: {
    Resources
  },

  mixins: [accessMixin],

  async mounted() {
    await this.$store.dispatch("resource/findAll", {
      filter: {
        offset: this.$route.query.offset || 0,
        limit: this.$route.query.limit || this.limit,
        order: [["createdAt", "DESC"]]
      }
    });
  },

  methods: {
    async getPage({ offset, limit }) {
      await this.$store.dispatch("resource/findAll", {
        filter: {
          offset,
          limit,
          order: [["createdAt", "DESC"]]
        }
      });
    }
  }
};
</script>
