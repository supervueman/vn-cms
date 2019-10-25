<template lang="pug">
  v-menu(offset-y)
    template(v-slot:activator="{ on }")
      v-btn(
        text
        v-on="on"
      ) {{d.applications || 'Приложения'}}
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
