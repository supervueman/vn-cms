<template lang="pug">
	v-flex
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
				v-for="context in contexts"
				:key="context.id"
			)
				v-list-item-content
					v-list-item-title {{context.title}} ({{context.slug}})
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
