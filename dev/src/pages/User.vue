<template lang="pug">
	v-flex(v-if="adminAccess || managerAccess")
		.body-2.mb-5 Профиль: {{user.slug}}
		profile-view(:profile="user" operationType="update")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

export default {
  name: "UserPage",

  components: {
    ProfileView
  },

  mixins: [accessMixin],
  computed: {
    user() {
      return this.$store.getters["user/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("user/findByPk", {
      id: this.$route.params.id,
      filter: {
        filter: {
          include: [{ model: "$role" }]
        }
      }
    });
    await this.$store.dispatch("role/findAll");
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("user/clear");
    next();
  }
};
</script>
