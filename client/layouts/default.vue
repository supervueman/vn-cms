<template lang="pug">
  .app
    m-toolbar
    m-notification
    nuxt
    m-footer
</template>

<script>
import mToolbar from "@/components/mToolbar";
import mFooter from "@/components/mFooter";
import mNotification from "@/components/mNotification";

export default {
  name: "DefaultLayout",

  components: {
    mToolbar,
    mFooter,
    mNotification
  }
};
</script>
