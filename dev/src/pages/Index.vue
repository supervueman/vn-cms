<template lang="pug">
  div.page Main page
</template>

<script>
import config from "@/config";
export default {
  name: "Index",

  data() {
    return {
      staticFolderBasePath: config.staticFolderBasePath
    };
  },

  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    }
  }
};
</script>
