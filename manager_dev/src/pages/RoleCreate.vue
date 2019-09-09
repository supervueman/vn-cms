<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Создание политики
    v-layout.wrap
      role-view(
        :role="role"
        operationType="create"
      )
</template>

<script>
// Components
import RoleView from "@/components/Role/View";

// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "RoleCreatePage",

  components: {
    RoleView
  },

  mixins: [accessMixin],

  computed: {
    role() {
      return this.$store.getters["get/role"];
    }
  }
};
</script>
