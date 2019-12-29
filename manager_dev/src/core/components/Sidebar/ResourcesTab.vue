<template lang="pug">
	v-flex.slidebar
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

		v-expansion-panels(
			accordion
			multiple
		)
			v-expansion-panel(
				v-for="context in contexts"
				:key="context.id"
			)
				v-expansion-panel-header {{context.title}} ({{context.slug}})
				v-expansion-panel-content
					v-list
						v-list-item(
							v-for="resource in context.resources"
							:key="resource.id"
							:to="`/resources/${resource.id}`"
						) {{resource.title}} ({{resource.id}})
</template>

<script>
export default {
	name: 'ResourcesTab',

	computed: {
		contexts() {
			return this.$store.getters['context/getAll'];
		}
	},

	methods: {
		async reloadResources() {
			await this.$store.dispatch('profile/findByAccessToken');
		}
	}
};
</script>

<style lang="sass">
.slidebar
	.v-expansion-panel::before
		border: none!important
		box-shadow: none
	.v-expansion-panel
		border: none!important
	.v-expansion-panels
		border-radius: 0!important
	.v-expansion-panel-header
		background-color: lightgray!important
</style>
