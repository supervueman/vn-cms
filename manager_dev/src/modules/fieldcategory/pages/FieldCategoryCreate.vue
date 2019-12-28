<template lang="pug">
  v-flex(v-if="r.is_field_category_create")
    .body-2.mb-12.mt-2 {{d.field_category_creation || 'Создание категории полей'}}
    v-card(outlined)
      v-card-text {{d.common_data || 'Общие данные'}}
      v-card-text
        v-layout.wrap
          v-flex.md12
            v-text-field(
              v-model="fieldCategory.title"
              :label="`${d.name || 'Наименование'}:`"
              required
              @input="$v.fieldCategory.title.$touch()"
              @blur="$v.fieldCategory.title.$touch()"
              :error-messages="titleErrors"
            )
      v-card-actions
        v-btn.ml-2.mb-2(
          depressed
          color="primary"
          @click="create"
          v-if="r.is_field_category_create"
        ) {{d.create || 'Создать'}}
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
      title: `${this.d.field_category_create || "Field category create"}`
    };
  },

  computed: {
    fieldCategory() {
      return this.$store.getters["fieldcategory/get"];
    },
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
      this.$v.$touch();
      if (this.r.is_field_category_create && !this.$v.$error) {
        const bool = await this.$store.dispatch("fieldcategory/create", {
          body: this.fieldCategory
        });

        if (bool) {
          this.$router.push(
            `/fieldcategories/${this.$store.getters["fieldcategory/get"].id}`
          );
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
