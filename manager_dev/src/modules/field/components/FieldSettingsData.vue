<template lang="pug">
  v-card-text
    v-select(
      :items="types"
      :label="`${d.field_type || 'Тип поля'}:`"
      v-model="field.fieldType"
      required
    )
    v-textarea(
      v-model="field.defaultValue"
      :label="`${d.default_value || 'Значение по умолчанию'}:`"
      :placeholder="d.string_or_json || 'Строка или json'"
      no-resize
    )
    v-textarea(
      v-if="field.fieldType === 'migx'"
      v-model="field.schema"
      :label="`${d.schema || 'Схема'}:`"
      :placeholder="d.string_or_json || 'Строка или json'"
      no-resize
    )
</template>

<script>
export default {
  name: "FieldSettingsData",

  computed: {
    field() {
      return this.$store.getters["field/get"];
    },
    types() {
      return this.$store.getters["field/getTypes"];
    }
  }
};
</script>
