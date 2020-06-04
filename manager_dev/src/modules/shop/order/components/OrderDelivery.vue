<template lang="pug">
	v-card(outlined)
		v-card-text
			v-select(
				v-model="order.deliveryId"
				:items="deliveries"
				item-text="title"
				item-value="id"
				@change="selectDelivery($event)"
				:label="`${d.delivery || 'Delivery'}:`"
			)

			h1.title {{d.cost || 'Cost'}}: {{order.delivery ? order.delivery.cost : 0}}

			v-text-field(
				v-for="(elem, i) in order.delivery_info" :key="i"
				v-model="elem.value"
				:label="elem.title"
			)
</template>

<script>
export default {
  name: "OrderDeliveryComponent",

  computed: {
    order() {
      return this.$store.getters["shop/order/get"];
    },
    deliveries() {
      return this.$store.getters["shop/delivery/getAll"];
    },
    delivery() {
      const delivery = this.$store.getters["shop/delivery/get"];

      delivery.schema =
        typeof delivery.schema === "string" ? JSON.parse(delivery.schema) : {};
      return delivery;
    }
  },

  async mounted() {
    await this.$store.dispatch("shop/delivery/findAll", {});
  },

  methods: {
    async selectDelivery(item) {
      await this.$store.dispatch("shop/delivery/findByPk", {
        params: {
          id: item
        }
      });
      this.order.deliveryId = item;
      this.order.delivery_info = this.delivery.schema;
      this.order.delivery = this.delivery;
    }
  }
};
</script>
