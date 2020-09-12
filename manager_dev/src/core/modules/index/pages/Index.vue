<template>
  <v-flex>
    <v-layout>
      <v-flex class="md7">
        <h1 class="mb-4">
          Hello {{ profile.firstname }}!
        </h1>
        <h3>
          VN-CMS use Node js (Express js) for the server side and Vue js for the client side. VN-CMS is also based on Rest API architecture for flexible request and data control.
        </h3>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'IndexPage',

  computed: {
    profile() {
      return this.$store.getters['profile/get'];
    }
  }
};
</script>
