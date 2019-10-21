<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card
          v-card-text {{d.common_data}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="fieldCategory.title"
                  :label="`${d.name}:`"
                  required
                  @input="$v.fieldCategory.title.$touch()"
                  @blur="$v.fieldCategory.title.$touch()"
                  :error-messages="titleErrors"
                )
        v-card
          v-card-actions
            v-btn.ml-2(
              color="primary"
              @click="create"
              v-if="r.is_field_category_create && operationType === 'create'"
            ) {{d.create}}
            v-btn.ml-2(
              color="primary"
              @click="update"
              v-if="r.is_field_category_update && operationType === 'update'"
            ) {{d.save}}
            v-btn.ml-2(
              color="error"
              @click="isRemoveDialog = true"
              v-if="r.is_field_category_delete && operationType === 'update'"
            ) {{d.remove}}
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
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "FieldView",

  mixins: [validationMixin],

  props: {
    fieldCategory: {
      type: Object,
      default() {
        return {};
      }
    },
    operationType: {
      type: String,
      default: "create"
    }
  },

  validations: {
    fieldCategory: {
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.fieldCategory.title.$dirty) return errors;
      !this.$v.fieldCategory.title.minLength &&
        errors.push("Название должено быть не менее 3 символов!");
      !this.$v.fieldCategory.title.required &&
        errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    async create() {
      if (!this.r.is_field_category_create) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("fieldcategory/create", {
          body: this.fieldCategory
        });
      }
    },

    async update() {
      if (!this.r.is_field_category_update) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("fieldcategory/update", {
          body: this.fieldCategory
        });
      }
    },

    async remove() {
      if (!this.r.is_field_category_delete) {
        return;
      }
      await this.$store.dispatch("fieldcategory/remove", {
        body: { id: this.fieldCategory.id }
      });
      this.$router.push("/fieldcategories");
    }
  }
};
</script>
