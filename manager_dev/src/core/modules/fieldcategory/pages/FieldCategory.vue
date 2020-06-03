<template lang="pug">
  v-flex(v-if="r.is_field_category_create")
    .body-2.mb-12.mt-2 {{d.field_category || 'Field category'}}: {{fieldCategory.title}} ({{fieldCategory.id}})
    v-card(outlined)
      v-card-text {{d.common_data || 'Common data'}}
      v-card-text
        v-layout.wrap
          v-flex.md12
            v-text-field(
              v-model="fieldCategory.title"
              :label="`${d.name || 'Name'}:`"
              required
              @input="$v.fieldCategory.title.$touch()"
              @blur="$v.fieldCategory.title.$touch()"
              :error-messages="titleErrors"
            )
      v-card-actions
        v-btn.ml-2.mb-2(
          depressed
          color="primary"
          @click="update"
          v-if="r.is_field_category_update"
        ) {{d.save || 'Save'}}

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
        :name="fieldCategory.title"
      )
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "FieldCategoryCreatePage",

  mixins: [validationMixin],

  validations: {
    fieldCategory: {
      title: { required, minLength: minLength(3) }
    }
  },

  metaInfo() {
    return {
      title: `${this.d.field_category || "Field category"}: ${
        this.fieldCategory.title
      }`
    };
  },

  data: () => ({
    isRemoveDialog: false
  }),

  computed: {
    fieldCategory() {
      return this.$store.getters["fieldcategory/get"];
    },

    titleErrors() {
      const errors = [];
      if (!this.$v.fieldCategory.title.$dirty) return errors;
      !this.$v.fieldCategory.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.fieldCategory.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("fieldcategory/findByPk", {
      params: {
        id: this.$route.params.id
      }
    });
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (this.r.is_field_category_update && !this.$v.$error) {
        await this.$store.dispatch("fieldcategory/update", {
          params: { id: this.fieldCategory.id },
          body: this.fieldCategory
        });
      }
    },

    async remove() {
      if (this.r.is_field_category_delete) {
        const bool = await this.$store.dispatch("fieldcategory/remove", {
          params: { id: this.fieldCategory.id }
        });
        if (bool) {
          this.$router.push("/fieldcategories");
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("fieldcategory/clear");
    next();
  }
};
</script>
