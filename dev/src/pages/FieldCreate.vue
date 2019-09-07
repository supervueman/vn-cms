<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Создание поля
    field-view(
      :field="field"
      operationType="create"
    )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Comnponents
import FieldView from "@/components/Field/View";

export default {
  name: "FieldCreatePage",

  components: {
    FieldView
  },

  mixins: [accessMixin],

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
