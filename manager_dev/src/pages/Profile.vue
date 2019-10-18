<template lang="pug">
	v-flex(v-if="isAuth")
		.body-2.mb-12.mt-2 {{d.your_profile}}: {{profile.slug}}
		v-flex
			profile-view(:profile="profile" operationType="update")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

export default {
  name: "ProfilePage",

  metaInfo() {
    return {
      title: `${this.d.profile || "Profile"}: ${this.profile.firstname} ${
        this.profile.lastname
      }`
    };
  },

  components: {
    ProfileView
  },

  mixins: [accessMixin],

  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  }
};
</script>
