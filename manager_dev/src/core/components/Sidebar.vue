<template lang="pug">
	v-navigation-drawer(
		v-model="drawer"
		width="300"
		:hide-overlay="hide_overlay"
		fixed
		app
		mobile-break-point="600"
		stateless
		manual-scroll
	)
		v-app-bar.primary(dark)
			v-img.mr-4(
				src="/static/dev-logo.svg" class="toolbar-logo"
				max-width="40px"
			)
		v-tabs(
			v-model="active"
			slider-color="primary"
			grow
		)
			v-tab(v-if="r.is_resource_read") {{d.resources || 'Ресурсы'}}
			v-tab-item(v-if="r.is_resource_read")
				v-app-bar(flat height="50")
					v-tooltip(top v-if="r.is_resource_create")
						template(v-slot:activator="{ on }")
							v-btn(
								slot="activator"
								text
								icon
								color="primary"
								to="/resource-create"
								v-on="on"
							)
								v-icon add_circle_outline
						span {{d.create_resource || 'Создать ресурс'}}
					v-tooltip(top v-if="r.is_resource_read")
						template(v-slot:activator="{ on }")
							v-btn(
								slot="activator"
								text
								icon
								color="primary"
								v-on="on"
								@click="reloadResources"
							)
								v-icon replay
						span {{d.reload || 'Обновить'}}

				v-list
					v-list-item(
						v-for="resource in resources"
						:key="resource.id"
						:to="`/resources/${resource.id}`"
					)
						v-list-item-action
							v-icon(color="primary") library_books
						v-list-item-content
							v-list-item-title {{resource.title}} ({{resource.id}})
					v-list-item(to="/resources" v-if="adminAccess")
						v-list-item-action
							v-icon(color="primary") library_books
						v-list-item-content
							v-list-item-title {{d.all_resources || 'Все ресурсы'}}

			v-tab(v-if="r.is_elements_access") {{d.develop || 'Разработка'}}
			v-tab-item(v-if="r.is_elements_access")
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

			v-tab(v-if="r.is_filesystem_access") {{d.files || 'Файлы'}}
			v-tab-item(v-if="r.is_filesystem_access")
				v-list
					v-list-item(to="/filesystem")
						v-list-item-action
							v-icon(color="primary") folder
						v-list-item-content
							v-list-item-title {{d.filesystem || 'Файловая система'}}
</template>

<script>
// Mixins
export default {
  name: "Sidebar",

  data() {
    return {
      active: null,
      drawer: true,
      mini: true,
      right: null,
      hide_overlay: true,
      panelName: "panel-resource",
      isLogo: true
    };
  },

  computed: {
    resources() {
      return this.$store.getters["profile/getResources"];
    }
  },

  methods: {
    async reloadResources() {
      await this.$store.dispatch("profile/findByAccessToken");
    },
    errorLogo(event) {
      this.isLogo = false;
    }
  }
};
</script>
