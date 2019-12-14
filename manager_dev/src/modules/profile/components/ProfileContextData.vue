<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text {{d.context || 'Контекст'}}: {{profile.context.slug}}
</template>

<script>
export default {
  name: "ProfileRoleData",

  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    }
  }
};
</script>
