<template lang="pug">
  transition(name="notification")
    .notification {{notification.text}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MNotification",

  computed: {
    ...mapGetters("notification", ["notification"])
  }
};
</script>
