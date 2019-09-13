<template lang="pug">
	v-flex(v-if="isAuth")
		.body-2.mb-12.mt-2 Ваш профиль: {{profile.slug}}
		v-flex
			profile-view(:profile="profile" operationType="update")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

// Query
import { queryRoles } from "@/query/role";

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
  },

  async mounted() {
    const data = {
      query: queryRoles()
    };
    await this.$store.dispatch("role/findAll", data);
  }
};
</script>
