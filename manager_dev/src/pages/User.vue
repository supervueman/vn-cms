<template lang="pug">
	v-flex(v-if="adminAccess || managerAccess")
		.body-2.mb-12.mt-2 {{d.profile}}: {{user.slug}}
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
      query: {
        filter: {
          include: ["role"]
        }
      }
    });

    await this.$store.dispatch("role/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("user/clear");
    next();
  }
};
</script>
