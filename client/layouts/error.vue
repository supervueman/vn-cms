<template lang="pug">
  main
    section.section.section--full-screen
      .container {{error}}
</template>

<script>
export default {
  name: "ErrorPage",

  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
