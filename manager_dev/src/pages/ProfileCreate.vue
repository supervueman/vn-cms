<template lang="pug">
  v-flex(v-if="adminAccess || managerAccess")
    .body-2.mb-5 Создание профиля
    profile-view(:profile="profile" operationType="create")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

// Query
import { queryRoles } from "@/query/role";

export default {
  name: "ProfileCreatePage",

  components: {
    ProfileView
  },

  mixins: [accessMixin],

  computed: {
    profile() {
      return this.$store.getters["user/get"];
    }
  },

  async mounted() {
    const data = {
      query: queryRoles()
    };
    await this.$store.dispatch("role/findAll", data);
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("user/clear");
    next();
  }
};
</script>
