<template>
  <VMenu offset-y>
    <template v-slot:activator="{ on }">
      <VBtn
        text
        depressed
        v-on="on"
      >
        {{ d.applications || 'Applications' }}
      </VBtn>
    </template>
    <VList>
      <VListItem
        v-for="(item, i) in modules"
        :key="i"
        :to="item.path"
      >
        <VListItemTitle>{{ d[item.lexicon] || item.name }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
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
