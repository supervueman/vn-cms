<template lang="pug">
  v-flex(v-if="r.is_tag_read")
    .body-2.mb-12.mt-2 {{d.tag || 'Tag'}}: {{tag.title}} ({{tag.id}})
    v-layout.wrap
      v-flex
        v-card(outlined)
          v-card-text {{d.common_data || 'Common data'}}
          v-card-text
            v-flex.md12
              v-text-field(
                v-model="tag.slug"
                :label="`${d.slug || 'Slug'}:`"
                required
                @input="$v.tag.slug.$touch()"
                @blur="$v.tag.slug.$touch()"
                :error-messages="slugErrors"
              )
              v-text-field(
                v-model="tag.title"
                :label="`${d.name || 'Name'}:`"
                required
                @input="$v.tag.title.$touch()"
                @blur="$v.tag.title.$touch()"
                :error-messages="titleErrors"
              )
          v-card-actions
            v-btn.ml-2.mb-2(
              depressed
              color="primary"
              @click="update"
              v-if="r.is_layout_create"
            ) {{d.save || 'Create'}}

    .d-flex.justify-center.mt-3
      v-btn(
        text
        color="error"
        depressed
        @click="isRemoveDialog = true"
      ) {{d.remove || 'Remove'}}

    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="tag.title"
      )
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "TagPage",

  mixins: [validationMixin],

  metaInfo() {
    return {
      title: `${this.d.tag || "Tag"}: ${this.tag.title}`
    };
  },

  validations: {
    tag: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data: () => ({
    isRemoveDialog: false
  }),

  computed: {
    tag() {
      return this.$store.getters["tag/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.tag.slug.$dirty) return errors;
      !this.$v.tag.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.tag.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.tag.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.tag.title.$dirty) return errors;
      !this.$v.tag.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.tag.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("tag/findByPk", {
      params: { id: this.$route.params.id }
    });
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (this.r.is_tag_update && !this.$v.$error) {
        await this.$store.dispatch("tag/update", {
          body: this.tag,
          params: { id: this.tag.id }
        });
      }
    },

    async remove() {
      if (this.r.is_tag_delete) {
        const bool = await this.$store.dispatch("tag/remove", {
          params: { id: this.tag.id }
        });
        if (bool) {
          this.$router.push("/tags");
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("tag/clear");
    next();
  }
};
</script>
