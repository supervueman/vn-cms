<template lang="pug">
	v-list
		v-list-item(to="/layouts" v-if="r.is_layout_read")
			v-list-item-action
				v-icon(color="primary") layers
			v-list-item-content
				v-list-item-title {{d.layouts || 'Layouts'}}
			v-list-item-action
				v-btn(icon to="/layout-create")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/fields" v-if="r.is_field_read")
			v-list-item-action
				v-icon(color="primary") playlist_add
			v-list-item-content
				v-list-item-title {{d.fields || 'Fields'}}
			v-list-item-action
				v-btn(icon to="/field-create")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/fieldcategories" v-if="r.is_field_category_read")
			v-list-item-action
				v-icon(color="primary") folder
			v-list-item-content
				v-list-item-title {{d.field_categories || 'Fields categories'}}
			v-list-item-action
				v-btn(icon to="/fieldcategory-create")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/tags" v-if="r.is_tag_read")
			v-list-item-action
				v-icon(color="primary") assignment
			v-list-item-content
				v-list-item-title {{d.tags || 'Tags'}}
			v-list-item-action
				v-btn(icon to="/tag-create")
					v-icon(color="primary") add_circle_outline
</template>

<script>
export default {
  name: "DevelopmentTab"
};
</script>
