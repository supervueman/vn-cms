<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text.pb-0 {{d.address || 'Адрес'}}
    v-card-text
      v-layout.wrap
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.country"
            :label="`${d.country || 'Страна'}:`"
          )
        v-flex.md6
          v-text-field(
            v-model="profile.city"
            :label="`${d.city || 'Город'}:`"
          )
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.street"
            :label="`${d.street || 'Улица'}:`"
          )
        v-flex.md6
          v-text-field(
            v-model="profile.home"
            :label="`${d.home || 'Дом'}:`"
          )
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.apartment"
            :label="`${d.apartment || 'Квартира'}:`"
          )
    v-card-actions.px-4.pb-4.pt-0
      v-btn(
        @click="update"
        color="primary"
        depressed
      ) {{d.save || 'Сохранить'}}
</template>

<script>
export default {
  name: "ProfileAddressData",

  computed: {
    profile() {
      return this.$store.getters["profile/get"];
    }
  },

  methods: {
    async update() {
      const data = {
        body: {
          country: this.profile.country,
          city: this.profile.city,
          street: this.profile.street,
          home: this.profile.home,
          apartment: this.profile.apartment
        },
        query: {
          filter: {
            include: ["role"]
          }
        }
      };
      await this.$store.dispatch("profile/update", data);
    }
  }
};
</script>
