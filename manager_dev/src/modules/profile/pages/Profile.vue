<template lang="pug">
  v-flex(v-if="isAuth")
    .body-2.mb-12.mt-2 {{d.your_profile || 'Ваш профиль'}}: {{profile.slug}} ({{profile.id}})
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        profile-common-data
        profile-contacts-data
        profile-address-data
        profile-keys-data.mb-3
        profile-password-change.mb-3
        .elevation-0.d-flex.justify-center
          v-btn(
            text
            color="error"
            depressed
            @click="isRemoveDialog = true"
          ) {{d.remove || 'Удалить'}}
      v-flex.xs12.md5.pl-2
        profile-avatar-data
    v-dialog(
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

export default {
  name: "ProfilePage",

  components: {
    ProfileCommonData,
    ProfileContactsData,
    ProfileKeysData,
    ProfilePasswordChange,
    ProfileAvatarData,
    ProfileAddressData
  },

  data: () => {
    return {
      isRemoveDialog: false
    };
  },

  metaInfo() {
    return {
      title: `${this.d.profile || "Profile"}: ${this.profile.firstname} ${
        this.profile.lastname
      }`
    };
  },

  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async remove() {
      await this.$store.dispatch("profile/remove");
      this.$router.push("/");
    }
  }
};
</script>
