<template lang="pug">
  v-flex(v-if="r.is_product_create")
    .body-2.mt-2.mb-12 {{d.product_creation || 'Product creation'}}
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card.mb-3(outlined)
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
          v-card-actions.px-4.pb-4
            v-btn(
              color="primary"
              depressed
              @click="create"
            ) {{d.create || 'Create'}}

      v-flex.xs12.md5.pl-2
        product-secondary-data
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
import cyrillicToTranslit from "cyrillic-to-translit-js";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

// Components
import ProductSecondaryData from "../components/ProductSecondaryData";

export default {
  name: "ProductCreatePage",

  components: {
    ProductSecondaryData
  },

  mixins: [validationMixin],

  validations: {
    product: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  metaInfo() {
    return {
      title: `${this.d.product_creation || "Product creation"}`
    };
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

  async mounted() {
    this.$store.dispatch("shop/product/clear");
    this.product.contextId = this.$store.getters["profile/get"].context.id;
  },

  methods: {
    async createProduct() {
      this.translitSlug();
      this.$v.$touch();
      if (this.r.is_product_create && !this.$v.$error) {
        if (this.$route.query.level) {
          this.product.level = Number(this.$route.query.level) + 1;
        } else {
          this.product.level = 1;
        }

        if (this.$route.query.parentId) {
          this.product.parentId = this.$route.query.parentId;
        }

        if (this.$route.query.contextId) {
          this.product.contextId = this.$route.query.contextId;
        }

        this.product.lang = this.mainLang;

        if (!this.product.contextId || this.product.contextId === "") {
          this.product.contextId = this.$store.getters[
            "profile/get"
          ].context.id;
        }

        const bool = await this.$store.dispatch("shop/product/create", {
          body: this.product
        });

        if (bool) {
          this.$router.push(
            `/shop/products/${this.$store.getters["shop/product/get"].id}`
          );
        }
      }
    },

    async createTranslation() {
      this.translitSlug();
      this.$v.$touch();
      if (this.r.is_product_create && !this.$v.$error) {
        this.product.level = this.$route.query.level;

        if (Number(this.$route.query.parentId)) {
          this.product.parentId = this.$route.query.parentId;
        }

        this.product.lang = this.$route.query.lang;

        this.product.contextId = this.$route.query.contextId;

        await this.$store.dispatch("shop/product/create", {
          body: this.product
        });

        const body = [];
        this.$store.getters["shop/product/getTranslations"].forEach(el => {
          body.push([el.id, this.$store.getters["shop/product/get"].id]);
          body.push([this.$store.getters["shop/product/get"].id, el.id]);
        });

        const bool = await this.$store.dispatch("shop/product/addTranslation", {
          body
        });

        if (bool) {
          this.$router.push(
            `/shop/products/${this.$store.getters["shop/product/get"].id}`
          );
        }
      }
    },

    async create() {
      if (this.$route.query.translationId) {
        await this.createTranslation();
      } else {
        await this.createProduct();
      }
    },

    translitSlug() {
      if (this.product.slug === "") {
        this.product.slug = cyrillicToTranslit({ preset: "uk" })
          .transform(this.product.title, "-")
          .toLowerCase();
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("shop/product/clear");
    next();
  }
};
</script>
