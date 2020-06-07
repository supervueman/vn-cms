<template lang="pug">
	v-toolbar(flat color="white")
		v-spacer
		v-btn(
			color="primary"
			to="/tag-create"
			dark
			v-if="r.is_tag_create"
			depressed
		) {{d.create_tag || 'Create tag'}}
</template>

<script>
export default {
  name: "TagsToolbar"
};
</script>
