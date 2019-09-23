<template lang="pug">
  div.page Main page
</template>

<script>
export default {
  name: "Index",

  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    }
  }
};
</script>
