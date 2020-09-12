<template lang="pug">
  v-app(light)
    transition(name="fade")
      notification(
        v-if="notification.isActive"
        :type="notification.type"
        :message="notification.message"
      )
    toolbar(
      :profileId="String(profile.id)"
      :firstname="profile.firstname"
      :lastname="profile.lastname"
      :image="profile.image"
      @openLoginDialog="isLoginDialog = true"
    )
    sidebar(
      v-if="isAuth"
    )
    v-main
      v-container(fluid)
        slot
    bottom-bar
    v-dialog(v-model="isLoginDialog" max-width="500px" min-width="320px")
      login(
        @closeLoginDialog="isLoginDialog = false"
      )
    v-overlay(
      :opacity="0.5"
      :value="preloader"
      :z-index="9998"
    )
</template>

<script>
export default {
  name: "DefaultLayout",

  data: () => ({
    isLoginDialog: false,
    content: ""
  }),

  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    },
    notification() {
      return this.$store.getters["notification/get"];
    },
    preloader() {
      return this.$store.getters["preloader/get"];
    }
  }
};
</script>
