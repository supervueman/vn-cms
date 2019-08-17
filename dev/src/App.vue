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
			v-if="adminAccess || managerAccess"
			:slug="profile.slug"
		)
		v-content
			v-container(fluid)
				router-view
		v-dialog(v-model="isLoginDialog" max-width="500px" min-width="320px")
			login(
				@closeLoginDialog="isLoginDialog = false"
			)
</template>

<script>
import accessMixin from "@/mixins/accessMixin";
export default {
  name: "App",
  mixins: [accessMixin],
  data() {
    return {
      isLoginDialog: false
    };
  },
  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    },
    notification() {
      return this.$store.getters["notification/get"];
    }
  },
  async beforeCreate() {
    await this.$store.dispatch("profile/findByAccessToken");
  }
};
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active
	transition: opacity .5s
.fade-enter, .fade-leave-to
	opacity: 0

.v-expansion-panel__header
	padding: 16px
</style>

