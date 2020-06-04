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
				//- v-img.mr-4(
				//- 	src="/static/dev-logo.svg" class="toolbar-logo"
				//- 	max-width="40px"
				//- )
		products-tab
</template>

<script>
// Components
import ProductsTab from "./Sidebar/ProductsTab";

export default {
  name: "Sidebar",

  components: {
    ProductsTab
  },

  data() {
    return {
      drawer: true,
      active: null
    };
  }
};
</script>
