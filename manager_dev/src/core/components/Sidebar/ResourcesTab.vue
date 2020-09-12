<template>
  <v-flex class="slidebar">
    <v-app-bar
      flat
      height="50"
    >
      <v-tooltip
        v-if="r.is_resource_create"
        top
      >
        <template v-slot:activator="{ on }">
          <v-btn
            slot="activator"
            text
            icon
            color="primary"
            to="/resource-create"
            v-on="on"
          >
            <v-icon>add_circle_outline</v-icon>
          </v-btn>
        </template>
        <span>{{ d.create_resource || 'Create resource' }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="r.is_resource_read"
        top
      >
        <template v-slot:activator="{ on }">
          <v-btn
            slot="activator"
            text
            icon
            color="primary"
            v-on="on"
            @click="reloadResources"
          >
            <v-icon>replay</v-icon>
          </v-btn>
        </template>

        <span>{{ d.reload || 'Reload' }}</span>
      </v-tooltip>
    </v-app-bar>

    <div class="resource--tree">
      <v-expansion-panels
        accordion
        multiple
      >
        <v-expansion-panel
          v-for="context in contexts"
          :key="context.id"
        >
          <v-expansion-panel-header>{{ context.title }} ({{ context.slug }})</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-treeview
              :key="componentKey"
              :items="context.resources"
              transition
              open-all
            >
              <template v-slot:prepend="{ item }">
                <div
                  class="link-wrapper"
                  @click="fetchResources(item)"
                >
                  <router-link :to="`/resources/${item.id}`">
                    {{ item.title }} ({{ item.id }})
                  </router-link>
                </div>
              </template>
            </v-treeview>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: "ResourcesTab",

  data: () => ({
    componentKey: 0
  }),

  computed: {
    contexts() {
      return this.$store.getters["context/getSidebarContexts"];
    }
  },

  methods: {
    async reloadResources() {
      await this.$store.dispatch("context/findSidebarContexts", {
        query: {
          filter: {
            include: [
              {
                association: "resources",
                where: {
                  level: 1,
                  lang: this.$store.getters["base/getMainLang"]
                }
              }
            ]
          }
        }
      });
    },

    async fetchResources(item) {
      if (!item.children) {
        const bool = await this.$store.dispatch(
          "resource/insertToSidebarResources",
          {
            query: {
              filter: {
                where: {
                  parentId: item.id
                }
              }
            }
          }
        );

        if (bool) {
          item.children = this.$store.getters[
            "resource/getInsertSidebarResources"
          ];
          this.componentKey += 1;
        }
      }
    }
  }
};
</script>

<style lang="sass">
.v-navigation-drawer__content
  overflow: hidden
.slidebar
  overflow: auto
  width: 100%
  height: calc(100vh - 165px)
  .v-expansion-panel::before
    border: none!important
    box-shadow: none
  .v-expansion-panel
    border: none!important
  .v-expansion-panels
    border-radius: 0!important
  .v-expansion-panel-header
    background-color: lightgray!important
  .v-expansion-panel-content__wrap
    padding: 0

  .v-treeview-node__root
    display: flex
  .v-treeview-node__content
    height: 100%
    flex: 1
    a
      width: 100%
      display: block
      padding: 5px
      text-decoration: none
      color: #000
  .link-wrapper
    width: 100%
  .router-link-exact-active, .router-link-active
    background-color: lightgray
    width: 100%
</style>
