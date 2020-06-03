<template lang="pug">
	v-toolbar(flat color="white")
		v-spacer
		v-btn(
			color="primary"
			to="/fieldcategory-create"
			dark
			depressed
			v-if="r.is_field_category_create"
		) {{d.create_field_category || 'Create fields category'}}
</template>

<script>
export default {
  name: "FieldCategoryToolbar"
};
</script>
