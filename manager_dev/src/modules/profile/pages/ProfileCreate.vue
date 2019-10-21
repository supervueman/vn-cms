<template lang="pug">
  v-flex(v-if="r.is_user_create")
    .body-2.mb-12.mt-2 {{d.profile_creation}}
    profile-view(:profile="profile" operationType="create")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "../components/View";

export default {
  name: "ProfileCreatePage",

  metaInfo() {
    return {
      title: `${this.d.profile_create || "Profile create"}`
    };
  },

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
