<template lang="pug">
	v-btn.mr-2(
		color="primary"
		depressed
		@click="updateBalance"
	) {{balance}} руб.
</template>

<script>
export default {
  name: "BalanceComponent",

  computed: {
    balance() {
      return this.$store.getters["smsc/getBalance"];
    }
  },

  async mounted() {
    await this.$store.dispatch("smsc/fetchBalance");
  },

  methods: {
    async updateBalance() {
      await this.$store.dispatch("smsc/fetchBalance");
    }
  }
};
</script>
