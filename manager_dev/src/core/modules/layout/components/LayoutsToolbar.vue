<template>
  <v-toolbar
    flat
    color="white"
  >
    <v-spacer />
    <v-btn
      v-if="r.is_layout_create"
      color="primary"
      to="/layout-create"
      dark
      depressed
    >
      {{ d.create_layout || 'Create layout' }}
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "LayoutsToolbar"
};
</script>
