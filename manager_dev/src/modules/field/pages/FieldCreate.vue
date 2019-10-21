<template lang="pug">
  v-flex(v-if="r.is_field_create")
    .body-2.mb-12.mt-2 {{d.field_creation}}
    field-view(
      :field="field"
      operationType="create"
    )
</template>

<script>
// Comnponents
import FieldView from "../components/View";

export default {
  name: "FieldCreatePage",

  metaInfo() {
    return {
      title: `${this.d.field_create || "Field create"}`
    };
  },

  components: {
    FieldView
  },

  computed: {
    field() {
      return this.$store.getters["field/get"];
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("field/clear");
    this.$store.dispatch("field/clearLayouts");
    next();
  }
};
</script>
