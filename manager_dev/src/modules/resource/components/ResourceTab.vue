<template lang="pug">
	v-layout.wrap.mt-4
		v-flex.xs12.md7.pr-2
			v-card.mb-3(outlined)
				v-card-text {{d.common_data || 'Общие данные'}}
				v-card-text
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="resource.slug"
								:label="`${d.slug || 'Псевдоним'}:`"
								v-on="on"
								@input="$v.resource.slug.$touch()"
								@blur="$v.resource.slug.$touch()"
								:error-messages="slugErrors"
							)
						span slug
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="resource.title"
								:label="`${d.name || 'Наименование'}:`"
								v-on="on"
								@input="$v.resource.title.$touch()"
								@blur="$v.resource.title.$touch()"
								:error-messages="titleErrors"
							)
						span title
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-textarea(
								v-model="resource.description"
								:label="`${d.description || 'Описание'}:`"
								v-on="on"
								no-resize
							)
						span description
				v-card-actions.px-4.pb-4
					v-btn(
						color="primary"
						depressed
						@click="update"
					) {{d.save || 'Сохранить'}}

		v-flex.xs12.md5.pl-2
			resource-secondary-data
</template>

<script>
import { validationMixin } from 'vuelidate';

// Libs
import { required, minLength, helpers } from 'vuelidate/lib/validators';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const alpha = helpers.regex('alpha', /^[a-zA-Z0-9_-]*$/);

// Components
import ResourceSecondaryData from './ResourceSecondaryData';

export default {
	name: 'ResourceData',

	components: {
		ResourceSecondaryData
	},

	mixins: [validationMixin],

	validations: {
		resource: {
			slug: { required, alpha, minLength: minLength(3) },
			title: { required, minLength: minLength(3) }
		}
	},

	computed: {
		resource() {
			return this.$store.getters['resource/get'];
		},

		slugErrors() {
			const errors = [];
			if (!this.$v.resource.slug.$dirty) return errors;
			!this.$v.resource.slug.minLength &&
				errors.push('Псевдоним должен быть не менее 3 символов!');
			!this.$v.resource.slug.alpha &&
				errors.push('Разрешены только английские символы!');
			!this.$v.resource.slug.required && errors.push('Обязательное поле!');
			return errors;
		},
		titleErrors() {
			const errors = [];
			if (!this.$v.resource.title.$dirty) return errors;
			!this.$v.resource.title.minLength &&
				errors.push('Псевдоним должен быть не менее 3 символов!');
			!this.$v.resource.title.required && errors.push('Обязательное поле!');
			return errors;
		}
	},

	methods: {
		async update() {
			this.translitSlug();
			this.$v.$touch();
			if (this.r.is_resource_update && !this.$v.$error) {
				await this.$store.dispatch('resource/update', {
					params: { id: this.resource.id },
					body: this.resource,
					query: {
						filter: {
							include: ['layout', 'resourcetype']
						}
					}
				});
			}
		},

		async remove() {
			if (!this.r.is_resource_delete) {
				const resources = this.$store.getters['resource/getAll'].filter(el => {
					if (el.id !== this.removeItem.id) {
						return el;
					}
				});

				await this.$store.dispatch('resource/remove', {
					params: { id: this.resource.id }
				});
			}
		},

		translitSlug() {
			if (this.resource.slug === '') {
				this.resource.slug = cyrillicToTranslit({ preset: 'uk' })
					.transform(this.resource.title, '-')
					.toLowerCase();
			}
		}
	}
};
</script>
