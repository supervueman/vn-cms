<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Создание профиля
    profile-view(:profile="profile" operationType="create")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ProfileView from "@/components/Profile/View";

// Model
import profile from "@/models/profile";

export default {
  name: "ProfileCreatePage",

  components: {
    ProfileView
  },

  mixins: [accessMixin],

  data() {
    return {
      profile
    };
  }
};
</script>
