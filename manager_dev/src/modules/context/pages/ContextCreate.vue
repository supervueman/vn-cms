<template lang="pug">
  v-flex(v-if="r.is_context_read")
    .body-2.mb-12.mt-2 {{d.context_creation || 'Создание контекста'}}
    v-card.mb-3(outlined)
      v-card-text.pb-0 {{d.common_data || 'Common data'}}
      v-card-text
        v-flex
          v-text-field(
            v-model="context.slug"
            :label="`${d.slug || 'Slug'}:`"
            @input="$v.context.slug.$touch()"
            @blur="$v.context.slug.$touch()"
            :error-messages="slugErrors"
          )
        v-flex
          v-text-field(
            v-model="context.title"
            :label="`${d.name || 'Наименование'}:`"
          )
      v-card-actions.px-4.pb-4.pt-0
        v-btn(
          @click="create"
          color="primary"
          depressed
          :disabled="context.slug === 'root'"
        ) {{d.create || 'Создать'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "ContextPage",

  metaInfo() {
    return {
      title: `${this.d.context || "Контекст"}: ${this.context.title}`
    };
  },

  mixins: [validationMixin],

  validations: {
    context: {
      slug: { required, alpha, minLength: minLength(3) }
    }
  },

  computed: {
    context() {
      return this.$store.getters["context/get"];
    },

    slugErrors() {
      const errors = [];
      if (!this.$v.context.slug.$dirty) return errors;
      !this.$v.context.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.context.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.context.slug.required &&
        errors.push(`${this.d.require_field || "Required field"}`);
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("context/clear");
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (this.r.is_context_create && !this.$v.$error) {
        const bool = await this.$store.dispatch("context/create", {
          body: {
            slug: this.context.slug,
            title: this.context.title
          }
        });
        if (bool) {
          this.$router.push(
            `/contexts/${this.$store.getters["context/get"].id}`
          );
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("context/clear");
    next();
  }
};
</script>
