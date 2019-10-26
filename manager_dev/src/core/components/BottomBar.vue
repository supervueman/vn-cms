<template lang="pug">
  v-footer(
    padless
    color="primary"
    absolute
    app
  )
    v-card(
      flat
      tile
      width="100%"
      class="primary"
    )
      v-divider
      v-card-text.white--text
        v-layout(justify-space-between)
          div {{ new Date().getFullYear() }} — Platform
          div Разработка MULTIKEY
</template>


<script>
export default {
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    items: ["default", "absolute", "fixed"],
    padless: false,
    variant: "default"
  }),
  computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    }
  }
};
