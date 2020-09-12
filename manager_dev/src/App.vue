<template>
  <div class="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  name: 'App',

  computed: {
    layout() {
      return this.$route.meta.layout || 'layout-default';
    }
  },

  async beforeCreate() {
    if (!!localStorage.getItem('access_token')) {
      const bool = await this.$store.dispatch('profile/findByAccessToken');

      if (bool) {
        await this.$store.dispatch('base/fetchMainLang');

        await this.$store.dispatch('base/fetchLang', {
          query: {
            filter: {
              where: {
                slug: this.$store.getters['base/getAdminLang']
              }
            }
          }
        });

        await this.$store.dispatch('base/fetchLexicons', {
          query: {
            filter: {
              where: {
                langId: this.$store.getters['base/getLang'].id
              }
            }
          }
        });

        await this.$store.dispatch('lang/findAll', {
          query: {
            filter: {
              order: [['createdAt', 'DESC']]
            }
          }
        });

        await this.$store.dispatch('context/findSidebarContexts', {
          query: {
            filter: {
              include: [
                {
                  association: 'resources',
                  where: {
                    level: 1,
                    lang: this.$store.getters['base/getMainLang']
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
