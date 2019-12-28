<template lang="pug">
  v-flex(v-if="r.is_field_category_create")
    .body-2.mb-12.mt-2 {{d.field_category || 'Категория полей'}}: {{fieldCategory.title}} ({{fieldCategory.id}})
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
          @click="update"
          v-if="r.is_field_category_update"
        ) {{d.save || 'Сохранить'}}

    .d-flex.justify-center.mt-3
      v-btn(
        text
        color="error"
        depressed
        @click="isRemoveDialog = true"
      ) {{d.remove || 'Удалить'}}

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

// Comnponents
import FieldCategoryView from "../components/View";

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
      title: `${this.d.field_category || "Категория полей"}: ${
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
        errors.push("Название должено быть не менее 3 символов!");
      !this.$v.fieldCategory.title.required &&
        errors.push("Обязательное поле!");
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
