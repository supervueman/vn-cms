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
		v-tabs(
			v-model="active"
			slider-color="primary"
			grow
		)
			v-tab {{d.resources}}
			v-tab-item
				v-app-bar(flat height="50")
					v-tooltip(top v-if="managerAccess")
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
						span {{d.create_resource}}

				v-expansion-panels(
					v-if="managerAccess"
				)
					v-expansion-panel
						v-expansion-panel-header {{slug}}
						v-expansion-panel-content
							v-list
								v-list-item.px-0.py-0(
									v-for="resource in resources"
									:key="resource.id"
									:to="`/resources/${resource.id}`"
								)
									v-list-item-action
										v-icon(color="primary") library_books
									v-list-item-content
										v-list-item-title {{resource.title}} ({{resource.id}})

				v-expansion-panels(
					v-if="adminAccess"
				)
					v-expansion-panel
						v-expansion-panel-header {{slug}}
						v-expansion-panel-content
							v-list
								v-list-item(
									to="/resources"
								)
									v-list-item-action
										v-icon(color="primary") folder
									v-list-item-content
										v-list-item-title {{d.all_resources}}

			v-tab(v-if="adminAccess") {{d.elements}}
			v-tab-item(v-if="adminAccess")
				v-list
					v-list-item(to="/layouts")
						v-list-item-action
							v-icon(color="primary") layers
						v-list-item-content
							v-list-item-title {{d.layouts}}
					v-list-item(to="/fields")
						v-list-item-action
							v-icon(color="primary") playlist_add
						v-list-item-content
							v-list-item-title {{d.additional_fields}}

			v-tab {{d.files}}
			v-tab-item
				v-list
					v-list-item(to="/filesystem")
						v-list-item-action
							v-icon(color="primary") folder
						v-list-item-content
							v-list-item-title {{d.filesystem}}
</template>

<script>
// Mixins
import panelMixin from "@/mixins/panelMixin";
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "Sidebar",

  mixins: [accessMixin],

  props: {
    slug: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      active: null,
      drawer: true,
      mini: true,
      right: null,
      hide_overlay: true,
      panelName: "panel-resource"
    };
  },

  computed: {
    resources() {
      return this.$store.getters["profile/getResources"];
    }
  }
};
</script>
