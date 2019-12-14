<template lang="pug">
  v-flex(v-if="r.is_user_create")
    .body-2.mb-12.mt-2 {{d.profile_creation}}
    profile-view(
      :profile="profile"
      operationType="create"
      @create="create"
    )
</template>

<script>
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

  methods: {
    async create() {
      await this.$store.dispatch("profile/createByEmail", {
        body: this.profile
      });
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("user/clear");
    next();
  }
};
</script>
