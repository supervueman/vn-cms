<template lang="pug">
  v-flex(v-if="r.is_fields_read")
    .body-2.mb-12.mt-2 {{d.additional_field}}: {{field.title}}
    field-view(
      :field="field"
      operationType="update"
    )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import FieldView from "@/components/Field/View";

export default {
  name: "FieldPage",

  components: {
    FieldView
  },

  mixins: [accessMixin],

  computed: {
    field() {
      return this.$store.getters["field/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("field/findByPk", {
      params: {
        id: this.$route.params.id
      },
      query: {
        filter: {
          include: ["layouts", "category"]
        }
      }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("field/clear");
    this.$store.dispatch("field/clearLayouts");
    next();
  }
};
</script>
