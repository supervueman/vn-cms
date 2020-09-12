<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        text
        depressed
        v-on="on"
      >
        {{ d.applications || 'Applications' }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in modules"
        :key="i"
        :to="item.path"
      >
        <v-list-item-title>{{ d[item.lexicon] || item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { modules } from '@/core/config';
export default {
  name: 'ApplicationsMenu',

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
