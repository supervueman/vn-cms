<template lang="pug">
	v-flex(v-if="r.is_order_read")
		.body-2.mt-2.mb-4 {{d.order_creation || 'Order creation'}}
		v-tabs(
			slider-color="primary"
			grow
		)
			v-tab {{d.common_data || 'Common data'}}
			v-tab-item
				v-flex
					v-card(outlined)
						v-card-text
							v-select(
								v-model="order.contextId"
								:items="contexts"
								item-text="title"
								item-value="id"
								:label="`${d.context || 'Context'}:`"
							)

							v-select(
								v-model="order.courierId"
								:items="couriers"
								item-text="firstname"
								item-value="id"
								:label="`${d.courier || 'Courier'}:`"
							)

							v-select(
								v-model="order.managerId"
								:items="managers"
								item-text="firstname"
								item-value="id"
								:label="`${d.manager || 'Manager'}:`"
							)

							v-select(
								v-model="order.orderstatusId"
								:items="orderstatuses"
								item-text="title"
								item-value="id"
								:label="`${d.orderstatus || 'Order status'}:`"
							)

							v-textarea(
								v-model="order.comment"
								:label="`${d.comment || 'Comment'}:`"
							)
						v-divider
						v-card-text
							h1.title {{d.order_summ || 'Order summ'}}: {{order.summ}}
							h1.title {{d.delivery_cost || 'Delivery cost'}}: {{order.delivery.cost ? order.delivery.cost : 0}}
							h1.title(
								v-for="modificator in order.modificators"
								:key="modificator.slug"
								v-if="modificator.target === 'cart-price'"
							) {{modificator.title}}: {{modificator.value}}
							h1.title {{d.total || 'Total'}}: {{totalSumm + (order.delivery.cost ? order.delivery.cost : 0)}}
							h1.title {{d.total_with_products_modificators || 'Total with products modificators'}}: {{totalSummWithProductsModificators + (order.delivery.cost ? order.delivery.cost : 0)}}
						v-card-actions.px-4.pb-4
							v-btn(
								color="primary"
								depressed
								v-if="r.is_order_create"
								@click="create"
							) {{d.create || 'Create'}}
			v-tab {{d.products || 'Products'}}
			v-tab-item
				order-products

			v-tab {{d.delivery_info || 'Delivery info'}}
			v-tab-item
				order-delivery

			v-tab {{d.order_modificators || 'Order modificators'}}
			v-tab-item
				order-modificators
</template>

<script>
import axios from "axios";
import OrderProducts from "../components/OrderProducts";
import OrderDelivery from "../components/OrderDelivery";
import OrderModificators from "../components/OrderModificators";

export default {
  name: "OrderCreatePage",

  components: {
    OrderProducts,
    OrderDelivery,
    OrderModificators
  },

  metaInfo() {
    return {
      title: `${this.d.order_creation || "Order creation"}`
    };
  },

  computed: {
    order() {
      return this.$store.getters["shop/order/get"];
    },

    contexts() {
      return this.$store.getters["context/getAll"];
    },

    couriers() {
      return this.$store.getters["shop/order/getCouriers"];
    },

    managers() {
      return this.$store.getters["shop/order/getManagers"];
    },

    orderstatuses() {
      return this.$store.getters["shop/orderstatus/getAll"];
    },

    totalSumm() {
      let totalSumm = this.order.summ;

      if (this.order && this.order.modificators.length > 0) {
        this.order.modificators.forEach(el => {
          if (el.target === "cart-price") {
            const cost = Number(el.value);
            if (cost) {
              switch (el.operator) {
                case "minus":
                  totalSumm -= cost;
                  break;
                case "plus":
                  totalSumm += cost;
                  break;
                case "multiply":
                  totalSumm += this.order.summ * cost;
                  break;
                case "divide":
                  totalSumm += this.order.summ / cost;
                  break;
                case "percent-minus":
                  totalSumm -= (this.order.summ * cost) / 100;
                  break;
                case "percent-plus":
                  totalSumm += (this.order.summ * cost) / 100;
                  break;
                case "percent-of":
                  totalSumm -= this.order.summ - (this.order.summ * cost) / 100;
                  break;
                default:
                  break;
              }
            }
          }
        });
      }
      return totalSumm;
    },

    totalSummWithProductsModificators() {
      let totalSumm = this.totalSumm;
      if (this.order && this.order.products.length > 0) {
        this.order.products.forEach(product => {
          if (product.OrderProduct.modificators.length > 1) {
            totalSumm += product.OrderProduct.modificators.reduce(
              acc,
              el => Number(acc.price) + Number(el.price)
            );
          } else if (product.OrderProduct.modificators.length === 1) {
            totalSumm += Number(product.OrderProduct.modificators[0].price);
          }
        });
      }
      return totalSumm;
    }
  },

  async mounted() {
    this.$store.dispatch("shop/order/clear");

    await this.$store.dispatch("context/findAll", {});

    await this.$store.dispatch("shop/order/findUsers", {
      query: {
        filter: {
          where: {
            "$role.slug$": "manager"
          },
          include: [{ association: "role" }]
        }
      },
      mark: "manager"
    });

    await this.$store.dispatch("shop/order/findUsers", {
      query: {
        filter: {
          where: {
            "$role.slug$": "courier"
          },
          include: [{ association: "role" }]
        }
      },
      mark: "courier"
    });

    await this.$store.dispatch("shop/orderstatus/findAll", {});
  },

  methods: {
    async create() {
      if (this.r.is_order_create) {
        const order = {
          ...this.order,
          products: this.order.products.map(el => ({
            id: el.id,
            quantity: el.OrderProduct.quantity,
            modificators: el.OrderProduct.modificators.map(el => el.slug)
          })),
          delivery_info: JSON.stringify(this.order.delivery_info),
          modificators: JSON.stringify(this.order.modificators)
        };

        const bool = await this.$store.dispatch("shop/order/create", {
          body: order
        });

        if (bool) {
          this.$router.push(
            `/shop/orders/${this.$store.getters["shop/order/get"].id}`
          );
        }
      }
    }
  }
};
</script>
