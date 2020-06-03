<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text {{d.context || 'Context'}}: {{profile.context.slug}}
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
