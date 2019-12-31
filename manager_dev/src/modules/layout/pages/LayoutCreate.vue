<template lang="pug">
  v-flex(v-if="r.is_layout_create")
    .body-2.mb-12.mt-2 {{d.layout_creation || 'Layout creation'}}
    v-layout.wrap
      v-flex
        v-card(outlined)
          v-card-text {{d.common_data || 'Common data'}}
          v-card-text
            v-flex.md12
              v-text-field(
                v-model="layout.slug"
                :label="`${d.slug || 'Slug'}:`"
                required
                @input="$v.layout.slug.$touch()"
                @blur="$v.layout.slug.$touch()"
                :error-messages="slugErrors"
              )
              v-text-field(
                v-model="layout.title"
                :label="`${d.name || 'Name'}:`"
                required
                @input="$v.layout.title.$touch()"
                @blur="$v.layout.title.$touch()"
                :error-messages="titleErrors"
              )
          v-card-actions
            v-btn.ml-2.mb-2(
              depressed
              color="primary"
              @click="create"
              v-if="r.is_layout_create"
            ) {{d.create || 'Create'}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "LayoutCreatePage",

  mixins: [validationMixin],

  metaInfo() {
    return {
      title: `${this.d.layout_create || "Layout create"}`
    };
  },

  validations: {
    layout: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  computed: {
    layout() {
      return this.$store.getters["layout/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.layout.slug.$dirty) return errors;
      !this.$v.layout.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.layout.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.layout.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.layout.title.$dirty) return errors;
      !this.$v.layout.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.layout.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (this.r.is_layout_create && !this.$v.$error) {
        const bool = await this.$store.dispatch("layout/create", {
          body: this.layout
        });

        if (bool) {
          this.$router.push("/layouts");
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("layout/clear");
    next();
  }
};
</script>
