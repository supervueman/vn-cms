<template>
  <v-toolbar
    flat
    color="white"
  >
    <v-spacer />
    <v-btn
      v-if="r.is_field_category_create"
      color="primary"
      to="/fieldcategory-create"
      dark
      depressed
    >
      {{ d.create_field_category || 'Create fields category' }}
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "FieldCategoryToolbar"
};
</script>
