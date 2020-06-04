<template lang="pug">
	v-layout
		v-flex {{tests}}
</template>

<script>
export default {
  name: "TestsPage",

  metaInfo() {
    return {
      title: "Tests title"
    };
  },

  computed: {
    tests() {
      return this.$store.getters["test/getTests"];
    }
  },

  async created() {
    await this.$store.dispatch("test/findAll");
  },

  beforeRouteLeave(from, to, next) {
    this.$store.dispatch("test/clearAll");
  }
};
</script>

<style lang="sass" scoped>
</style>
