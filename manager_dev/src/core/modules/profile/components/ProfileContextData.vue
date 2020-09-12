<template>
  <v-card
    class="mb-3"
    outlined
  >
    <v-card-text>
      {{ d.context || 'Context' }}: {{ profile.context.slug }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ProfileRoleData",

  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
