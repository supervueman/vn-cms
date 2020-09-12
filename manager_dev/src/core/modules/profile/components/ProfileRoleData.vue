<template>
  <v-card
    class="mb-3"
    outlined
  >
    <v-card-text class="pb-0">
      {{ d.role || 'Role' }}: {{ profile.role.title }}
    </v-card-text>
    <v-card-text>
      {{ d.role_slug || 'Role slug' }}: {{ profile.role.slug }}
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
