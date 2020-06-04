<template lang="pug">
	v-layout
		v-flex {{test}}
</template>

<script>
export default {
  name: "TestPage",

  metaInfo() {
    return {
      title: "Test title"
    };
  },

  computed: {
    test() {
      return this.$store.getters["test/getTest"];
    }
  },

  async created() {
    await this.$store.dispatch("test/findByPk", {
      params: {
        id: this.$route.params.id
      }
    });
  },

  beforeRouteLeave(from, to, next) {
    this.$store.dispatch("test/clear");
  }
};
</script>

<style lang="sass" scoped>
</style>
