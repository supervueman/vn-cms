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
			:slug="profile.slug"
		)
		v-content
			v-container(fluid)
				router-view
		v-dialog(v-model="isLoginDialog" max-width="500px" min-width="320px")
			login(
				@closeLoginDialog="isLoginDialog = false"
			)
		v-overlay(
			:opacity="0.2"
			:value="preloader"
			:z-index="9998"
		)
			v-progress-circular(
				indeterminate
				size="64"
				color="primary"
			)
</template>

<script>
// Mixins
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
    },
    preloader() {
      return this.$store.getters["preloader/get"];
    }
  },
  async beforeCreate() {
    await this.$store.dispatch("profile/findByAccessToken");

    // Тестовая функция на отправку почты
    // await this.$store.dispatch("mail/send", {
    //   from: "<chaogen2@example.com>", // sender address
    //   to: "chaogen2@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>" // html body
    // });
  },

  async mounted() {
    await this.$store.dispatch("dictionary/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });

    if (!this.isAuth) {
      await this.$store.dispatch("dictionary/findOne", {
        query: {
          filter: {
            where: {
              lang: localStorage.getItem("admin-panel-lang") || "en"
            }
          }
        }
      });
    }
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
