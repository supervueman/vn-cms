<template lang="pug">
	v-card.mb-3(outlined)
		v-card-text
			v-select(
				v-model="resource.layoutId"
				:items="layouts"
				item-text="title"
				item-value="id"
				:label="`${d.layout || 'Layout'}:`"
			)
			v-select(
				v-model="resource.resourcetypeId"
				:items="types"
				item-text="title"
				item-value="id"
				:label="`${d.resource_type || 'Resource type'}:`"
			)
			v-select(
				v-model="resource.contextId"
				:items="contexts"
				item-text="title"
				item-value="id"
				:label="`${d.context || 'Context'}:`"
				v-if="!$route.query.contextId && !$route.params.id"
			)
			v-flex.md12
				v-tooltip(top)
					template(v-slot:activator="{ on }")
						v-checkbox(
							v-model="resource.published"
							:label="`${d.published || 'Published'}`"
							color="primary"
							v-on="on"
						)
					span published
			v-tooltip(top)
				template(v-slot:activator="{ on }")
					v-text-field(
						v-model="resource.menuindex"
						:label="`${d.menunindex || 'Menuindex'}:`"
						v-on="on"
					)
				span menuindex
</template>

<script>
export default {
  name: "ResourceSecondaryData",

  computed: {
    resource() {
      return this.$store.getters["resource/get"];
    },
    layouts() {
      return this.$store.getters["layout/getAll"];
    },
    types() {
      return this.$store.getters["resource/getTypes"];
    },
    contexts() {
      return this.$store.getters["context/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });

    await this.$store.dispatch("context/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });

    await this.$store.dispatch("resource/findTypes");
  }
};
</script>
