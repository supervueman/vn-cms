<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text.pb-0 {{d.role || 'Роль'}}: {{profile.role.title}}
    v-card-text {{d.role_slug || 'Псевдоним роли'}}: {{profile.role.slug}}
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
