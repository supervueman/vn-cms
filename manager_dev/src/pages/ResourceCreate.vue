<template lang="pug">
  v-flex(v-if="managerAccess")
    .body-2.mb-5 Создание ресурса
      v-layout.wrap.pt-5
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

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("resource/clear");
    next();
  }
};
</script>
