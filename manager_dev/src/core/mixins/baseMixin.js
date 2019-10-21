const mixin = {
  computed: {
    mainLang() {
      return this.$store.getters['base/getMainLang'];
    },
  }
}

export default mixin;
