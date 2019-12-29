<template lang="pug">
	v-card.mb-3(outlined)
		v-card-text
			v-select(
				v-model="resource.layoutId"
				:items="layouts"
				item-text="title"
				item-value="id"
				:label="`${d.layout}:`"
			)
			v-select(
				v-model="resource.resourcetypeId"
				:items="types"
				item-text="title"
				item-value="id"
				:label="`${d.resource_type}:`"
			)
			v-select(
				v-model="resource.contextId"
				:items="contexts"
				item-text="title"
				item-value="id"
				:label="`${d.context}:`"
			)
			v-flex.md12
				v-tooltip(top)
					template(v-slot:activator="{ on }")
						v-checkbox(
							v-model="resource.published"
							:label="`${d.published}`"
							color="primary"
							v-on="on"
						)
					span published
			v-tooltip(top)
				template(v-slot:activator="{ on }")
					v-text-field(
						v-model="resource.menuindex"
						:label="`${d.menunindex || 'Меню-индекс'}:`"
						v-on="on"
					)
				span menuindex
</template>

<script>
export default {
	name: 'ResourceSecondaryData',

	computed: {
		resource() {
			return this.$store.getters['resource/get'];
		},
		layouts() {
			return this.$store.getters['layout/getAll'];
		},
		types() {
			return this.$store.getters['resource/getTypes'];
		},
		contexts() {
			return this.$store.getters['context/getAll'];
		}
	},

	async mounted() {
		await this.$store.dispatch('layout/findAll', {
			query: {
				filter: {
					order: [['createdAt', 'DESC']]
				}
			}
		});

		await this.$store.dispatch('resource/findTypes');
	}
};
</script>
