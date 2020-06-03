<template lang="pug">
	v-toolbar(flat color="white")
		v-spacer
		v-btn(
			color="primary"
			to="/layout-create"
			dark
			v-if="r.is_layout_create"
			depressed
		) {{d.create_layout || 'Create layout'}}
</template>

<script>
export default {
  name: "LayoutsToolbar"
};
</script>
