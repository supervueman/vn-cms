<template lang="pug">
	v-list
		v-list-item(to="/layouts" v-if="r.is_layout_read")
			v-list-item-action
				v-icon(color="primary") layers
			v-list-item-content
				v-list-item-title {{d.layouts || 'Шаблоны'}}
			v-list-item-action
				v-btn(icon to="/layout-create")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/fields" v-if="r.is_field_read")
			v-list-item-action
				v-icon(color="primary") playlist_add
			v-list-item-content
				v-list-item-title {{d.fields || 'Поля'}}
			v-list-item-action
				v-btn(icon to="/field-create")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/fieldcategories" v-if="r.is_field_category_read")
			v-list-item-action
				v-icon(color="primary") folder
			v-list-item-content
				v-list-item-title {{d.field_categories || 'Категории полей'}}
			v-list-item-action
				v-btn(icon to="/fieldcategory-create")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/components")
			v-list-item-action
				v-icon(color="primary") view_week
			v-list-item-content
				v-list-item-title {{d.components || 'Компоненты'}}
			v-list-item-action
				v-btn(icon to="/chunk")
					v-icon(color="primary") add_circle_outline
		v-list-item(to="/pages")
			v-list-item-action
				v-icon(color="primary") library_books
			v-list-item-content
				v-list-item-title {{d.pages || 'Страницы'}}
			v-list-item-action
				v-btn(icon to="/page")
					v-icon(color="primary") add_circle_outline
</template>

<script>
export default {
	name: 'DevelopmentTab'
};
</script>
