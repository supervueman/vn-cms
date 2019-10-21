const mixin = {
  computed: {
    dictionary() {
      return this.$store.getters['dictionary/get'];
    },
    d() {
      const dictionary = {};
      if (this.$store.getters['dictionary/get'].value) {
        for (let key in this.$store.getters['dictionary/get'].value) {
          dictionary[key] = this.$store.getters['dictionary/get'].value[key].text;
        }
      }

      this.$store.getters['dictionary/get'];
      return dictionary;
    }
  }
}

export default mixin;
