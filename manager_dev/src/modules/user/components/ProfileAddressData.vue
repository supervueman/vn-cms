<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text.pb-0 {{d.address || 'Address'}}
    v-card-text
      v-layout.wrap
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.country"
            :label="`${d.country || 'Country'}:`"
          )
        v-flex.md6
          v-text-field(
            v-model="profile.city"
            :label="`${d.city || 'City'}:`"
          )
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.street"
            :label="`${d.street || 'Street'}:`"
          )
        v-flex.md6
          v-text-field(
            v-model="profile.home"
            :label="`${d.home || 'Home'}:`"
          )
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.apartment"
            :label="`${d.apartment || 'Apartment'}:`"
          )
    v-card-actions.px-4.pb-4.pt-0
      v-btn(
        @click="update"
        color="primary"
        depressed
      ) {{d.save || 'Save'}}
</template>

<script>
export default {
  name: "ProfileAddressData",

  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    async update() {
      if (this.r.is_user_update) {
        const data = {
          params: {
            id: this.profile.id
          },
          body: {
            country: this.profile.country,
            city: this.profile.city,
            street: this.profile.street,
            home: this.profile.home,
            apartment: this.profile.apartment
          },
          query: {
            filter: {
              include: ["role", "context"]
            }
          }
        };
        await this.$store.dispatch("user/update", data);
      }
    }
  }
};
</script>
