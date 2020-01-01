<template lang="pug">
	v-navigation-drawer(
		v-model="drawer"
		width="320"
		:hide-overlay="true"
		fixed
		app
		mobile-break-point="600"
		stateless
		manual-scroll
	)
		v-app-bar.primary(dark)
			router-link(to="/")
				v-img.mr-4(
					src="/static/dev-logo.svg" class="toolbar-logo"
					max-width="40px"
				)

		v-tabs(
			v-model="active"
			slider-color="primary"
			grow
		)
			v-tab(v-if="r.is_resource_read") {{d.resources || 'Resources'}}
			v-tab-item(v-if="r.is_resource_read")
				resources-tab

			v-tab(v-if="r.is_development_access") {{d.develop || 'Develop'}}
			v-tab-item(v-if="r.is_development_access")
				development-tab

			v-tab(v-if="r.is_filesystem_access") {{d.files || 'Files'}}
			v-tab-item(v-if="r.is_filesystem_access")
				files-tab
</template>

<script>
// Components
import ResourcesTab from "./Sidebar/ResourcesTab";
import DevelopmentTab from "./Sidebar/DevelopmentTab";
import FilesTab from "./Sidebar/FilesTab";

export default {
  name: "Sidebar",

  components: {
    ResourcesTab,
    DevelopmentTab,
    FilesTab
  },

  data() {
    return {
      drawer: true,
      active: null
    };
  }
};
</script>
