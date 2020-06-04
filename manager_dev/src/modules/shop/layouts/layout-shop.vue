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
    shop-sidebar(
      v-if="isAuth"
    )
    v-content
      shop-toolbar
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
import ShopToolbar from "../components/ShopToolbar";
import ShopSidebar from "../components/Sidebar";

export default {
  name: "DefaultLayout",

  components: {
    ShopToolbar,
    ShopSidebar
  },

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
  },

  async beforeCreate() {
    if (!!localStorage.getItem("access_token")) {
      const bool = await this.$store.dispatch("profile/findByAccessToken");
      if (bool) {
        await this.$store.dispatch("base/fetchMainLang");

        await this.$store.dispatch("dictionary/findOne", {
          query: {
            filter: {
              where: {
                lang: localStorage.getItem("admin-panel-lang") || "en"
              }
            }
          }
        });

        await this.$store.dispatch("shop/product/findSidebarContexts", {
          query: {
            filter: {
              include: [
                {
                  association: "products",
                  where: {
                    level: 1,
                    lang: this.$store.getters["base/getMainLang"] || "en"
                  }
                }
              ]
            }
          }
        });
      }
    }
  }
};
</script>
