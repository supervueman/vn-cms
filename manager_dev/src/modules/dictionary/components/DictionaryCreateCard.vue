<template lang="pug">
  v-card(outlined)
    v-card-title.px-4 {{d.create_dictionary || 'Создать словарь'}}
    v-card-text.px-4
      v-text-field(
        :label="`${d.slug || 'Псевдоним'}`"
        v-model="createDictionary.lang"
        :error-messages="langErrors"
        @input="$v.createDictionary.lang.$touch()"
        @blur="$v.createDictionary.lang.$touch()"
      )
      v-text-field(
        :label="`${d.name || 'Наименование'}`"
        v-model="createDictionary.title"
        :error-messages="titleErrors"
        @input="$v.createDictionary.title.$touch()"
        @blur="$v.createDictionary.title.$touch()"
      )
    v-card-actions
      v-btn.ml-2(
        color="primary"
        depressed
        @click="create"
      ) {{d.create || 'Создать'}}
      v-btn(
        color="error"
        depressed
        @click="$emit('cancel', false)"
      ) {{d.cancel || 'Отмена'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z_]*$/);

export default {
  name: "DictionaryCreateCard",

  mixins: [validationMixin],

  validations: {
    createDictionary: {
      lang: { required, alpha, minLength: minLength(2) },
      title: { required, minLength: minLength(3) }
    }
  },

  data: () => ({
    createDictionary: {
      lang: "",
      title: "",
      value: {}
    }
  }),

  computed: {
    langErrors() {
      const errors = [];
      if (!this.$v.createDictionary.lang.$dirty) return errors;
      !this.$v.createDictionary.lang.minLength &&
        errors.push("Псевдоним должен быть не менее 2 символов!");
      !this.$v.createDictionary.lang.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.createDictionary.lang.required &&
        errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.createDictionary.title.$dirty) return errors;
      !this.$v.createDictionary.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.createDictionary.title.required &&
        errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    create() {
      this.$v.createDictionary.$touch();
      if (!this.$v.createDictionary.$error && this.r.is_dictionary_create) {
        this.$emit("create", this.createDictionary);
      }
    }
  }
};
</script>
