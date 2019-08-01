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

// Models
import field from "@/models/field";

// Comnponents
import FieldView from "@/components/Field/View";

export default {
  name: "FieldCreatePage",

  components: {
    FieldView
  },

  mixins: [accessMixin],

  data() {
    return {
      field
    };
  }
};
</script>
