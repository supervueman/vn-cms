<template lang="pug">
  main.main
    section.container.section--full-screen
      .container
        h1 {{dictionary.vn_cms}}
        h3 {{dictionary.greeting}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "IndexPage",

  computed: {
    ...mapGetters("dictionary", ["dictionary"])
  }
};
</script>
