<template>
  <v-app-bar
    class="primary"
    app
    dark
    flat
  >
    <v-toolbar-title>
      <v-img
        class="mr-4 mobile-logo"
        src="/static/logo.svg"
        max-width="40px"
        aspect-ratio="1"
      />
    </v-toolbar-title>

    <v-toolbar-items class="hidden-xs-and-down">
      <v-btn
        v-if="r.is_user_read && isAuth"
        text
        to="/users"
      >
        {{ d.users || 'Users' }}
      </v-btn>
      <applications-menu v-if="isAuth" />
    </v-toolbar-items>

    <v-spacer />

    <v-toolbar-items class="hidden-xs-and-down">
      <v-btn
        v-if="!isAuth"
        text
        @click="$emit('openLoginDialog')"
      >
        {{ d.login || 'Login' }}
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items class="hidden-xs-and-down">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
          >
            <v-img
              :src="`/images/flags/${adminLang}.svg`"
              width="30"
            />
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="lang in langs"
            :key="lang.slug"
            @click="changeLang(lang)"
          >
            <v-img
              class="mr-2"
              :src="`/images/flags/${lang.slug || adminLang}.svg`"
              width="30"
            />
            <v-list-item-title>
              {{ lang.slug }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-if="isAuth"
        slot="activator"
        text
        to="/profile"
      >
        <div class="body-1 mr-3">
          {{ firstname }} {{ lastname }}
        </div>
        <v-avatar
          class="mr-3"
          size="40"
          color="grey lighten-4"
        >
          <img :src="`${imgFolderBasePath}/${image}`">
        </v-avatar>
      </v-btn>

      <v-menu
        v-if="isAuth"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            icon
            v-on="on"
          >
            <v-icon>settings</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-if="r.is_role_read"
            to="/roles"
          >
            <v-list-item-title>{{ d.roles || 'Roles' }}</v-list-item-title>
          </v-list-item>
            
          <v-list-item
            v-if="r.is_system_setting_read"
            to="/system-settings"
          >
            <v-list-item-title>{{ d.system_settings || 'System settings' }}</v-list-item-title>
          </v-list-item>
            
          <v-list-item
            v-if="r.is_context_read"
            to="/contexts"
          >
            <v-list-item-title>
              {{ d.contexts || 'Contexts' }}
            </v-list-item-title>
          </v-list-item>
            
          <v-list-item to="/dictionaries">
            <v-list-item-title>
              {{ d.dictionaries || 'Dictionaries' }}
            </v-list-item-title>
          </v-list-item>
            
          <v-list-item @click="logout">
            <v-list-item-title>
              {{ d.logout || 'Logout' }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { imgFolderBasePath } from "@/core/config";

// Components
import ApplicationsMenu from "./ApplicationsMenu";

export default {
  name: "Toolbar",

  components: {
    ApplicationsMenu
  },

  props: {
    profileId: {
      type: String,
      default: ""
    },
    firstname: {
      type: String,
      default: ""
    },
    lastname: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      imgFolderBasePath,
      isLogo: true
    };
  },

  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    },

    langs() {
      return this.$store.getters["lang/getAll"];
    },

    logo() {
      return this.isLogo ? "/static/logo.svg" : "/static/dev-logo.svg";
    }
  },

  methods: {
    async changeLang(lang) {
      localStorage.setItem("admin-panel-lang", lang.slug);
      this.$store.dispatch("base/setAdminLang", lang.slug);
      await this.$store.dispatch("base/fetchLexicons", {
        query: {
          filter: {
            where: {
              langId: lang.id
            }
          }
        }
      });
    },

    async logout() {
      this.$router.push("/");
      await this.$store.dispatch("authenticate/logout");
      // this.$store.dispatch("field/clear");
      // this.$store.dispatch("field/clearAll");
      // this.$store.dispatch("field/clearLayouts");
      // this.$store.dispatch("layout/clear");
      // this.$store.dispatch("layout/clearAll");
      // this.$store.dispatch("profile/clear");
      // this.$store.dispatch("profile/clearResources");
      // this.$store.dispatch("profile/clearRules");
      // this.$store.dispatch("role/clear");
      // this.$store.dispatch("role/clearAll");
      // this.$store.dispatch("user/clear");
      // this.$store.dispatch("user/clearAll");
    }
  }
};
</script>

<style lang="sass">
.mobile-logo
  display: none
</style>
