<template lang="pug">
  v-card-text
    v-select(
      :items="types"
      :label="`${d.field_type || 'Field type'}:`"
      v-model="field.fieldType"
      required
    )
    v-textarea(
      v-model="field.defaultValue"
      :label="`${d.default_value || 'Default value'}:`"
      :placeholder="d.string_or_json || 'String or JSON'"
      no-resize
    )
    v-textarea(
      v-if="field.fieldType === 'migx'"
      v-model="field.schema"
      :label="`${d.schema || 'Schema'}:`"
      :placeholder="d.string_or_json || 'String or JSON'"
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
