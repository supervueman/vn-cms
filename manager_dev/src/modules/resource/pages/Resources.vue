<template lang="pug">
  v-flex(v-if="adminAccess || managerAccess")
    .body-2.mb-12.mt-2 {{d.resources}}
    resources
</template>

<script>
// Components
import Resources from "../components/Resources";

export default {
  name: "ResourcesPage",

  metaInfo() {
    return {
      title: `${this.d.resources || "Resources"}`
    };
  },

  components: {
    Resources
  }
};
</script>
