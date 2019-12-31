<template lang="pug">
  v-flex(v-if="r.is_context_read")
    .body-2.mb-12.mt-2 {{d.context || 'Context'}}: {{context.slug}} ({{context.id}})
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
            :label="`${d.name || 'Name'}:`"
          )
      v-card-actions.px-4.pb-4.pt-0
        v-btn(
          @click="update"
          color="primary"
          depressed
          :disabled="context.slug === 'root'"
        ) {{d.save || 'Save'}}
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="context.title"
      )
    .d-flex.justify-center.mt-3
      v-btn(
        :disabled="context.slug === 'root'"
        text
        color="error"
        depressed
        @click="isRemoveDialog = true"
      ) {{d.remove || 'Remove'}}
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
      title: `${this.d.context || "Context"}: ${this.context.slug}`
    };
  },

  mixins: [validationMixin],

  validations: {
    context: {
      slug: { required, alpha, minLength: minLength(3) }
    }
  },

  data: () => {
    return {
      isRemoveDialog: false
    };
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
    await this.$store.dispatch("context/findByPk", {
      params: {
        id: this.$route.params.id
      }
    });
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (this.r.is_context_update && !this.$v.$error) {
        await this.$store.dispatch("context/update", {
          body: {
            id: this.context.id,
            slug: this.context.slug,
            title: this.context.title
          }
        });
      }
    },

    async remove() {
      if (this.r.is_role_delete) {
        const bool = await this.$store.dispatch("context/remove", {
          body: {
            id: this.context.id
          }
        });
        if (bool) {
          this.$router.push("/contexts");
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
