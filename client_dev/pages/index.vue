<template lang="pug">
  section.container
    div.links
      div(v-for="item in resources" :key="item.id")
        h3 {{item.title}}
        div(v-for="field in item.additionalfields")
          div(v-if="field.slug === 'category_image'")
            img(:src="field.value", alt="")
          h4(v-else-if="field.slug === 'category_name'") {{field.value}}
          div(v-else-if="field.slug === 'color'") {{field.value}}
          div(v-else) {{field}}
</template>

<script>
export default {
  computed: {
    notification() {
      return this.$store.getters["notification/get"];
    },
    resources() {
      return this.$store.getters["resource/getAll"];
    }
  },

  async asyncData({ store }) {
    await store.dispatch("resource/findAll");
  }
};
</script>

<style>
</style>
