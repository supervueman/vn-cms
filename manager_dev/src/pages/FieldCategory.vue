<template lang="pug">
  v-flex(v-if="r.is_field_category_create")
    .body-2.mb-12.mt-2 {{d.field_category_creation}}
    field-category-view(
      :fieldCategory="fieldCategory"
      operationType="update"
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
      title: `${this.d.field_category || "Field category"}: ${
        this.fieldCategory.title
      }`
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

  async mounted() {
    await this.$store.dispatch("fieldcategory/findByPk", {
      params: {
        id: this.$route.params.id
      }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("fieldcategory/clear");
    next();
  }
};
</script>
