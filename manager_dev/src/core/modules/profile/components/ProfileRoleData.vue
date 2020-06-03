<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text.pb-0 {{d.role || 'Role'}}: {{profile.role.title}}
    v-card-text {{d.role_slug || 'Role slug'}}: {{profile.role.slug}}
</template>

<script>
export default {
  name: "ProfileRoleData",

  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
