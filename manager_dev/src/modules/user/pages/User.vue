<template lang="pug">
	v-flex(v-if="r.is_user_read")
		.body-2.mb-12.mt-2 {{d.profile}}: {{user.slug}} ({{user.id}})
		profile-view(:profile="user" operationType="update")
</template>

<script>
// Components
import ProfileView from "@/modules/profile/components/View";

export default {
  name: "UserPage",

  components: {
    ProfileView
  },

  metaInfo() {
    return {
      title: `${this.d.profile || "Profile"}: ${
        this.profile ? this.profile.firstname : ""
      } ${this.profile ? this.profile.lastname : ""}`
    };
  },

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
