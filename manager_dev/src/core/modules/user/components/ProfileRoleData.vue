<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text.pb-0(v-if="!r.is_user_update_role") {{d.role || 'Role'}}: {{profile.role.title}}
    v-card-text(v-if="!r.is_user_update_role") {{d.role_slug || 'Role slug'}}: {{profile.role.slug}}
    v-card-text(v-if="r.is_user_update_role")
      v-select(
        :items="roles"
        item-text="title"
        item-value="id"
        v-model="profile.roleId"
        :label="`${d.role || 'Role'}:`"
      )
    v-card-actions(v-if="r.is_user_update_role")
      v-btn.ml-2.mb-2(
        color="primary"
        depressed
        @click="changeRole"
      ) {{d.save || 'Save'}}
</template>

<script>
export default {
  name: "ProfileRoleData",

  props: {
    profile: {
      type: Object,
      default: () => {}
    },

    roles: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    async changeRole() {
      if (this.r.is_user_update_role) {
        const data = {
          body: {
            userId: this.profile.id,
            roleId: this.profile.roleId
          }
        };
        await this.$store.dispatch("user/changeRole", data);
      }
    }
  }
};
</script>
