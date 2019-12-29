<template lang="pug">
	v-flex(v-if="r.is_resource_read")
		.body-2.mt-2.mb-12 {{d.resource || 'Ресурс'}}: {{resource.title}} ({{resource.id}}) {{resource}}
		v-tabs(
			v-model="tab"
			slider-color="primary"
			grow
		)
			v-tab {{d.common_data || 'Общие данные'}}
			v-tab-item
				resource-tab
</template>

<script>
// Components
import ResourceTab from '../components/ResourceTab';

export default {
	name: 'Resource',

	components: {
		ResourceTab
	},

	metaInfo() {
		return {
			title: `${this.d.resource || 'Ресурс'}: ${this.resource.title}`
		};
	},

	data() {
		return {
			tab: null
		};
	},

	computed: {
		resource() {
			return this.$store.getters['resource/get'];
		}
	},

	async mounted() {
		await this.$store.dispatch('resource/findByPk', {
			params: {
				id: this.$route.params.id
			},
			query: {
				filter: {
					include: [
						{
							association: 'layout',
							include: ['fields']
						},
						'additionalfields',
						{
							association: 'parent',
							include: ['translations']
						},
						'translations',
						'resourcetype'
					]
				}
			}
		});
	},

	async beforeRouteUpdate(to, from, next) {
		await this.$store.dispatch('resource/findByPk', {
			params: {
				id: to.params.id
			},
			query: {
				filter: {
					include: [
						{
							association: 'layout',
							include: ['fields']
						},
						'additionalfields',
						{
							association: 'parent',
							include: ['translations']
						},
						'translations',
						'resourcetype',
						'context'
					]
				}
			}
		});
		next();
	},

	beforeRouteLeave(to, from, next) {
		this.$store.dispatch('resource/clear');
		next();
	}
};
</script>
