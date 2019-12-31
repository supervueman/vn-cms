<template lang="pug">
  v-flex(v-if="r.is_field_create")
    .body-2.mb-12.mt-2 {{d.field_creation || 'Создание поля'}}
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card(outlined)
          v-card-text {{d.common_data || 'Общие данные'}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="field.slug"
                  :label="`${d.slug || 'Псевдоним'}:`"
                  @input="$v.field.slug.$touch()"
                  @blur="$v.field.slug.$touch()"
                  :error-messages="slugErrors"
                )
                v-text-field(
                  v-model="field.title"
                  :label="`${d.name || 'Наименование'}:`"
                  @input="$v.field.title.$touch()"
                  @blur="$v.field.title.$touch()"
                  :error-messages="titleErrors"
                )
      v-flex.xs12.md5.pl-2
        field-secondary-data
      v-flex.xs12.md7.pr-2.mt-4
        v-card(outlined)
          field-settings-data
          v-card-actions.pb-4
            v-btn.ml-2(
              color="primary"
              @click="create"
              depressed
              v-if="r.is_field_create"
            ) {{d.create || 'Создать'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

// Comnponents
import FieldSecondaryData from "../components/FieldSecondaryData";
import FieldSettingsData from "../components/FieldSettingsData";

export default {
  name: "FieldCreatePage",

  components: {
    FieldSecondaryData,
    FieldSettingsData
  },

  mixins: [validationMixin],

  validations: {
    field: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  metaInfo() {
    return {
      title: `${this.d.field_create || "Field create"}`
    };
  },

  computed: {
    field() {
      return this.$store.getters["field/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.field.slug.$dirty) return errors;
      !this.$v.field.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "Поле должено быть не менее 3 символов"}`
        );
      !this.$v.field.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Разрешены только английские символы"}`
        );
      !this.$v.field.slug.required &&
        errors.push(`${this.d.required_field || "Обязательное поле"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.field.title.$dirty) return errors;
      !this.$v.field.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "Поле должено быть не менее 3 символов"}`
        );
      !this.$v.field.title.required &&
        errors.push(`${this.d.required_field || "Обязательное поле"}`);
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (this.r.is_field_create && !this.$v.$error) {
        const bool = await this.$store.dispatch("field/create", {
          body: this.field
        });
        if (bool) {
          this.$router.push(`/fields/${this.$store.getters["field/get"].id}`);
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("field/clear");
    this.$store.dispatch("field/clearLayouts");
    next();
  }
};
</script>
