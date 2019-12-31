<template lang="pug">
  main.main
    section.container.section--full-screen {{dictionary}}
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
