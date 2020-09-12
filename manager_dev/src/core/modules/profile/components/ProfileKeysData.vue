<template>
  <v-expansion-panels>
    <v-expansion-panel class="elevation-none">
      <v-expansion-panel-header class="px-4">
        {{ d.keys || 'Keys' }}
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-0">
        {{ d.public_key || 'Public key' }}: {{ profile.token }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "ProfileKeysData",

  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="sass">
  .elevation-none
    box-shadow: none!important
    border: 1px solid rgba(0, 0, 0, 0.12)
    &::before
      box-shadow: none!important
  .v-expansion-panel-content__wrap
    padding:
      right: 16px
      left: 16px
</style>
