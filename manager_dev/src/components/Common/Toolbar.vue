<template lang="pug">
	v-app-bar.primary(app dark)
		v-toolbar-title
			//- img(:src="`${imgFolderBasePath}/logo.svg`" class="toolbar-logo")
		v-toolbar-items.hidden-xs-and-down
			v-btn(text to="/users" v-if="adminAccess || managerAccess") Пользователи
		v-spacer
		v-toolbar-items.hidden-xs-and-down
			v-btn(text v-if="!isAuth" @click="$emit('openLoginDialog')") Войти
		v-toolbar-items.hidden-xs-and-down
			v-menu(offset-y v-if="isAuth")
				template(v-slot:activator="{ on }")
					v-btn(
						text
						v-on="on"
					)
						v-img(
							:src="`/images/flags/${dictionary.lang || 'ru'}.svg`"
							width="30"
						)
				v-list
					v-list-item(
						v-for="dictionary in dictionaries"
						:key="dictionary.lang"
						@click="changeLang(dictionary.lang)"
					)
						v-img.mr-2(:src="`/images/flags/${dictionary.lang || 'ru'}.svg`", alt="alt" width="30")
						v-list-item-title {{dictionary.lang}}
			v-btn(text slot="activator" to="/profile" v-if="profileId !== '0'")
				div.body-1.mr-3 {{ firstname }} {{lastname}}
				v-avatar.mr-3(size="40" color="grey lighten-4")
					img(:src="`${imgFolderBasePath}/${image}`")
			v-menu(offset-y v-if="isAuth")
				template(v-slot:activator="{ on }")
					v-btn(
						text
						icon
						v-on="on"
					)
						v-icon settings
				v-list
					v-list-item(to="/roles" v-if="adminAccess")
						v-list-item-title Политики доступа
					v-list-item(to="/system-settings" v-if="adminAccess")
						v-list-item-title Системные настройки
					v-list-item(to="/dictionaries" v-if="adminAccess")
						v-list-item-title Словари
					v-list-item(@click="logout")
						v-list-item-title Выход
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
    },

    dictionary() {
      return this.$store.getters["dictionary/get"];
    },

    dictionaries() {
      return this.$store.getters["dictionary/getAll"];
    }
  },

  methods: {
    async changeLang(lang) {
      localStorage.setItem("admin-panel-lang", lang);
      await this.$store.dispatch("dictionary/findOne", {
        query: {
          filter: {
            where: {
              lang
            }
          }
        }
      });
    },
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
