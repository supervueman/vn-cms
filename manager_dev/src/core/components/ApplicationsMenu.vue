<template lang="pug">
  v-menu(offset-y)
    template(v-slot:activator="{ on }")
      v-btn(
        text
        v-on="on"
        depressed
      ) {{d.applications || 'Applications'}}
    v-list
      v-list-item(
        v-for="(item, i) in modules"
        :key="i"
        :to="item.path"
      )
        v-list-item-title {{item.name}}
</template>

<script>
import { modules } from "@/core/config";
export default {
  name: "ApplicationsMenu",

  data() {
    return {
      modules
    };
  }
};
</script>

<style lang="sass">
  .v-menu__content
    box-shadow: none
    border: 1px solid rgba(0, 0, 0, 0.12)
</style>
