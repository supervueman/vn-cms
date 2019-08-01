<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Создание шаблона
    v-layout.wrap
      layout-view(
        :layout="layout"
        operationType="create"
      )
</template>

<script>
// Components
import LayoutView from "@/components/Layout/View";

// Mixins
import accessMixin from "@/mixins/accessMixin";

// Models
import layout from "@/models/layout";

export default {
  name: "LayoutCreatePage",

  components: {
    LayoutView
  },

  mixins: [accessMixin],

  data() {
    return {
      layout
    };
  }
};
</script>
