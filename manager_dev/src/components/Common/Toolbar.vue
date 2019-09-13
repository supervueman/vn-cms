<template lang="pug">
	v-toolbar.primary(app dark)
		v-toolbar-title
			//- img(:src="`${imgFolderBasePath}/logo.svg`" class="toolbar-logo")
		v-toolbar-items.hidden-xs-and-down
			v-btn(flat to="/users" v-if="adminAccess || managerAccess") Пользователи
		v-spacer
		v-toolbar-items.hidden-xs-and-down
			v-btn(flat v-if="!isAuth" @click="$emit('openLoginDialog')") Войти
		v-toolbar-items.hidden-xs-and-down
			v-btn(flat slot="activator" to="/profile" v-if="profileId !== '0'")
				div.body-1.mr-3 {{ firstname }} {{lastname}}
				v-avatar.mr-3(size="40" color="grey lighten-4")
					img(:src="`${imgFolderBasePath}/${image}`")
			v-menu(offset-y v-if="isAuth")
				v-btn(
					flat
					icon
					slot="activator"
				)
					v-icon settings
				v-list
					v-list-tile(to="/roles" v-if="adminAccess")
						v-list-tile-title Политики доступа
					v-list-tile(@click="logout")
						v-list-tile-title Выход
</template>

<script>
import { imgFolderBasePath } from "@/config";
import accessMixin from "@/mixins/accessMixin";
export default {
  name: "Toolbar",

  mixins: [accessMixin],

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
      imgFolderBasePath
    };
  },

  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"];
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch("authenticate/logout");
      this.$store.dispatch("field/clear");
      this.$store.dispatch("field/clearAll");
      this.$store.dispatch("field/clearLayouts");
      this.$store.dispatch("layout/clear");
      this.$store.dispatch("layout/clearAll");
      this.$store.dispatch("profile/clear");
      this.$store.dispatch("profile/clearResources");
      this.$store.dispatch("role/clear");
      this.$store.dispatch("role/clearAll");
      this.$store.dispatch("user/clear");
      this.$store.dispatch("user/clearAll");
      this.$router.push("/");
    }
  }
};
</script>
