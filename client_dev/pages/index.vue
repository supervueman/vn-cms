<template lang="pug">
  section.container
    div
      logo
      h1.title client_dev
      h2.subtitle My super-excellent Nuxt.js project
      div.links
        a.button--green(href="https://nuxtjs.org/" target="_blank") Documentation
        a.button--grey(href="https://github.com/nuxt/nuxt.js" target="_blank") GitHub
        div {{resources}}
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },

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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
