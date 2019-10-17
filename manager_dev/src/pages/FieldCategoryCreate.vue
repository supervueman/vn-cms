<template lang="pug">
  v-flex(v-if="r.is_field_category_create")
    .body-2.mb-12.mt-2 {{d.field_category_creation}}
    field-category-view(
      :fieldCategory="fieldCategory"
      operationType="create"
    )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Comnponents
import FieldCategoryView from "@/components/FieldCategory/View";

export default {
  name: "FieldCategoryCreatePage",

  components: {
    FieldCategoryView
  },

  mixins: [accessMixin],

  computed: {
    fieldCategory() {
      return this.$store.getters["fieldCategory/get"];
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("fieldCategory/clear");
    next();
  }
};
</script>
