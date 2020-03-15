<template lang="pug">
	.app
		component(:is="layout")
			router-view
</template>

<script>
export default {
  name: "App",

  computed: {
    layout() {
      return this.$route.meta.layout || "layout-default";
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

        await this.$store.dispatch("context/findSidebarContexts", {
          query: {
            filter: {
              include: [
                {
                  association: "resources",
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
              lang: localStorage.getItem("admin-panel-lang") || "ru"
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

.v-dialog
  box-shadow: none!important
</style>
