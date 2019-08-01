<template lang="pug">
	v-flex(v-if="adminAccess || managerAccess")
		.body-2.mb-5 Ваш профиль: {{profile.slug}}
		profile-view(:profile="profile" operationType="update")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

export default {
  name: "ProfilePage",

  components: {
    ProfileView
  },

  mixins: [accessMixin],

  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    }
  }
};
</script>
