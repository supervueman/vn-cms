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

  metaInfo() {
    return {
      title: `${this.d.field_category_create || "Field category create"}`
    };
  },

  components: {
    FieldCategoryView
  },

  mixins: [accessMixin],

  computed: {
    fieldCategory() {
      return this.$store.getters["fieldcategory/get"];
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("fieldcategory/clear");
    next();
  }
};
</script>
