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

  mixins: [accessMixin]
};
</script>
