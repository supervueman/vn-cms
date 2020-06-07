<template lang="pug">
	v-layout.wrap
		v-flex.xs12.md7.pr-2
			v-card.mb-2(outlined)
				v-card-text {{d.common_data || 'Common data'}}
				v-card-text
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="resource.slug"
								:label="`${d.slug || 'Slug'}:`"
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
								:label="`${d.name || 'Name'}:`"
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
								:label="`${d.description || 'Description'}:`"
								v-on="on"
								no-resize
							)
						span description
				v-card-actions.px-4.pb-4
					v-btn(
						color="primary"
						depressed
						@click="update"
					) {{d.save || 'Save'}}

		v-flex.xs12.md5
			resource-secondary-data
			resource-tags
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
import cyrillicToTranslit from "cyrillic-to-translit-js";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

// Components
import ResourceSecondaryData from "./ResourceSecondaryData";
import ResourceTags from "../components/ResourceTags";

export default {
  name: "ResourceData",

  components: {
    ResourceSecondaryData,
    ResourceTags
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
      return this.$store.getters["resource/get"];
    },

    slugErrors() {
      const errors = [];
      if (!this.$v.resource.slug.$dirty) return errors;
      !this.$v.resource.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.resource.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.resource.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.resource.title.$dirty) return errors;
      !this.$v.resource.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.resource.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async update() {
      this.translitSlug();
      this.$v.$touch();
      if (this.r.is_resource_update && !this.$v.$error) {
        await this.$store.dispatch("resource/update", {
          params: { id: this.resource.id },
          body: this.resource
        });

        await this.$store.dispatch("resource/findByPk", {
          params: {
            id: this.$route.params.id
          },
          query: {
            filter: {
              include: [
                {
                  association: "layout",
                  include: ["fields"]
                },
                "additionalfields",
                {
                  association: "parent",
                  include: ["translations"]
                },
                "translations",
                "resourcetype",
                "context"
              ]
            }
          }
        });
      }
    },

    translitSlug() {
      if (this.resource.slug === "") {
        this.resource.slug = cyrillicToTranslit({ preset: "uk" })
          .transform(this.resource.title, "-")
          .toLowerCase();
      }
    }
  }
};
</script>
