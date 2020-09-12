<template>
  <v-toolbar
    flat
    color="white"
  >
    <v-spacer />
    <v-btn
      v-if="r.is_tag_create"
      color="primary"
      to="/tag-create"
      dark
      depressed
    >
      {{ d.create_tag || 'Create tag' }}
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "TagsToolbar"
};
</script>
