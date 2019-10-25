<template lang="pug">
  v-flex(v-if="r.is_roles_create") {{role}}
    .body-2.mb-12.mt-2 {{d.role_creation}}
    v-layout.wrap
      role-view(
        :role="role"
        operationType="create"
      )
</template>

<script>
// Components
import RoleView from "../components/View";

export default {
  name: "RoleCreatePage",

  metaInfo() {
    return {
      title: `${this.d.role_create || "Role create"}`
    };
  },

  components: {
    RoleView
  },

  computed: {
    role() {
      const role = {
        ...this.$store.getters["role/get"],
        rules: {
          ...this.$store.getters["role/getDefaultRules"]
        }
      };
      return role;
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findDefaultRules");
  }
};
</script>
