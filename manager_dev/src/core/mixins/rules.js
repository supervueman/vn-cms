const mixin = {
  computed: {
    r() {
      return this.$store.getters['profile/getRules'];
    }
  }
}

export default mixin;
