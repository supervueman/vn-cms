<template lang="pug">
	v-layout.wrap
		v-flex.xs12.md7.pr-2
			v-card.mb-2(outlined)
				v-card-text {{d.common_data || 'Common data'}}
				v-card-text
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="product.slug"
								:label="`${d.slug || 'Slug'}:`"
								v-on="on"
								@input="$v.product.slug.$touch()"
								@blur="$v.product.slug.$touch()"
								:error-messages="slugErrors"
							)
						span slug
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="product.title"
								:label="`${d.name || 'Name'}:`"
								v-on="on"
								@input="$v.product.title.$touch()"
								@blur="$v.product.title.$touch()"
								:error-messages="titleErrors"
							)
						span title
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-textarea(
								v-model="product.description"
								:label="`${d.description || 'Description'}:`"
								v-on="on"
								no-resize
							)
						span description
				product-options
				v-card-actions.px-4.pb-4
					v-btn(
						color="primary"
						depressed
						@click="update"
					) {{d.save || 'Save'}}

		v-flex.xs12.md5
			product-secondary-data
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
import cyrillicToTranslit from "cyrillic-to-translit-js";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

// Components
import ImageField from "../../../../core/components/ImageField";
import ProductSecondaryData from "./ProductSecondaryData";
import ProductOptions from "./ProductOptions";

export default {
  name: "ProductData",

  components: {
    ImageField,
    ProductSecondaryData,
    ProductOptions
  },

  mixins: [validationMixin],

  validations: {
    product: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    },

    slugErrors() {
      const errors = [];
      if (!this.$v.product.slug.$dirty) return errors;
      !this.$v.product.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.product.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.product.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.product.title.$dirty) return errors;
      !this.$v.product.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.product.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async update() {
      this.translitSlug();
      this.$v.$touch();
      if (this.r.is_product_update && !this.$v.$error) {
        await this.$store.dispatch("shop/product/update", {
          params: { id: this.product.id },
          body: {
            ...this.product,
            modificators: JSON.stringify(this.product.modificators)
          }
        });

        await this.$store.dispatch("shop/product/findByPk", {
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
                "productfields",
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
      if (this.product.slug === "") {
        this.product.slug = cyrillicToTranslit({ preset: "uk" })
          .transform(this.product.title, "-")
          .toLowerCase();
      }
    }
  }
};
</script>
