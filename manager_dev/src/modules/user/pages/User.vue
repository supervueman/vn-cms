<template lang="pug">
	v-flex(v-if="r.is_user_read")
		.body-2.mb-12.mt-2 {{d.profile || 'Profile'}}: {{profile.slug}} ({{profile.id}})
		v-layout.wrap
			v-flex.xs12.md7.pr-2
				profile-common-data(:profile="profile")
				profile-contacts-data(:profile="profile")
				profile-address-data(:profile="profile")
				profile-keys-data.mb-3(:profile="profile")
				profile-password-change.mb-3(:profile="profile")
				.d-flex.justify-center
					v-btn(
						text
						color="error"
						depressed
						@click="isRemoveDialog = true"
					) {{d.remove || 'Remove'}}
			v-flex.xs12.md5.pl-2
				profile-avatar-data(:profile="profile")
				profile-role-data(:profile="profile" :roles="roles")
				profile-context-data(:profile="profile" :contexts="contexts")
		v-dialog.elevation-0(
			v-model="isRemoveDialog"
			max-width="500px"
		)
			remove-confirm(
				@remove="remove"
				:isActive.sync="isRemoveDialog"
				:name="`${profile.lastname} ${profile.firstname}`"
			)
</template>

<script>
// Components
import ProfileCommonData from "../components/ProfileCommonData";
import ProfileContactsData from "../components/ProfileContactsData";
import ProfileKeysData from "../components/ProfileKeysData";
import ProfilePasswordChange from "../components/ProfilePasswordChange";
import ProfileAvatarData from "../components/ProfileAvatarData";
import ProfileAddressData from "../components/ProfileAddressData";
import ProfileRoleData from "../components/ProfileRoleData";
import ProfileContextData from "../components/ProfileContextData";

export default {
  name: "UserPage",

  components: {
    ProfileCommonData,
    ProfileContactsData,
    ProfileKeysData,
    ProfilePasswordChange,
    ProfileAvatarData,
    ProfileAddressData,
    ProfileRoleData,
    ProfileContextData
  },

  metaInfo() {
    return {
      title: `${this.d.profile || "Profile"}: ${this.profile.firstname} ${
        this.profile.lastname
      }`
    };
  },

  data: () => ({
    isRemoveDialog: false
  }),

  computed: {
    profile() {
      return this.$store.getters["user/get"];
    },

    roles() {
      return this.$store.getters["role/getAll"];
    },

    contexts() {
      return this.$store.getters["context/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("user/findByPk", {
      id: this.$route.params.id,
      query: {
        filter: {
          include: ["role", "context"]
        }
      }
    });

    await this.$store.dispatch("role/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });

    await this.$store.dispatch("context/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async remove() {
      if (this.r.is_user_delete) {
        const bool = await this.$store.dispatch("user/remove", {
          body: {
            id: this.profile.id
          }
        });
        if (bool) {
          this.$router.push("/users");
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("user/clear");
    next();
  }
};
</script>
