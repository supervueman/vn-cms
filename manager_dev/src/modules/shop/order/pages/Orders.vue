<template lang="pug">
  v-flex(v-if="r.is_order_read")
    .body-2.mb-6.mt-2 {{d.orders || 'Orders'}}
    v-card(outlined)
      v-toolbar(flat height="100")
        v-spacer
        v-text-field.mr-2(
          v-model="order_num"
          :label="`${d.order_num || 'Order num'}:`"
        )
        v-select.mr-2(
          v-model="order_status"
          :items="orderstatuses"
          item-text="title"
          item-value="id"
          :label="`${d.order_status || 'Order status'}:`"
        )

        v-btn(
          color="primary"
          depressed
          @click="search"
        ) {{d.search || 'Search'}}
        v-tooltip(top v-if="r.is_product_read")
          template(v-slot:activator="{ on }")
            v-btn(
              slot="activator"
              text
              icon
              color="primary"
              v-on="on"
              @click="reload"
            )
              v-icon replay
          span {{d.reload || 'Reload'}}
        v-btn(
          depressed
          color="primary"
          v-if="r.is_order_create"
          to="/shop/order-create"
        ) {{d.order_create || "Create order"}}
      v-data-table(
        :headers="headers"
        :items="orders"
        :items-per-page-options="[limit]"
        hide-default-footer
      )
        template(v-slot:body="{items}")
          tbody
            tr(v-for="item in items" :key="item.id")
              td.text-xs-left
                router-link(:to="`/shop/orders/${item.id}`") {{ item.order_num }}
              td.text-xs-left
                .d-flex.align-center
                  .order-status-color(:style="{'background-color': item.orderstatus ? item.orderstatus.color : 'lightgray'}")
                  .ml-2 {{item.orderstatus ? item.orderstatus.title : ''}}
              td.text-xs-left
                div {{item.summ}}
              td.text-xs-left
                div {{item.delivery ? item.delivery.cost : 0}}
              td.text-xs-left
                div {{item.delivery ? item.delivery.cost + item.summ : item.summ}}
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="isRemoveDialog = true; removeItem = item;"
                  v-if="r.is_order_delete"
                )
                  v-icon delete
      v-card-actions.text-xs-center.pt-2
        pagination(
          :itemsLength="count"
          @getPage="getPage"
          :limit="limit"
        )

      v-dialog(
        v-model="isRemoveDialog"
        max-width="500px"
      )
        remove-confirm(
          @remove="remove"
          :isActive.sync="isRemoveDialog"
          :name="removeItem.title"
        )
</template>

<script>
export default {
  name: "OrdersPage",

  metaInfo() {
    return {
      title: `${this.d.orders || "Orders"}`
    };
  },

  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      isRemoveDialog: false,
      removeItem: {},
      limit: 10,
      order_num: "",
      order_status: ""
    };
  },

  computed: {
    headers() {
      return [
        {
          text: this.d.order_num || "Order num",
          value: "order_num"
        },
        {
          text: this.d.order_status || "Order status",
          value: "orderstatus.title"
        },
        {
          text: this.d.order_summ || "Order summ",
          value: "summ"
        },
        {
          text: this.d.delivery_cost || "Delivery cost",
          value: "delivery.cost"
        },
        {
          text: this.d.summ || "Summ",
          value: "summ"
        },
        { text: "", sortable: false }
      ];
    },
    orders() {
      return this.$store.getters["shop/order/getAll"];
    },
    orderstatus() {
      return this.$store.getters["shop/order/get"];
    },
    orderstatuses() {
      return this.$store.getters["shop/orderstatus/getAll"];
    },
    count() {
      return this.$store.getters["shop/order/getCount"];
    }
  },

  async mounted() {
    await this.reload();

    await this.$store.dispatch("shop/orderstatus/findAll", {});
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: ["orderstatus", "delivery"]
          }
        }
      };
      await this.$store.dispatch("shop/order/findAll", data);
    },

    async remove() {
      if (this.r.is_order_delete) {
        await this.$store.dispatch("shop/order/remove", {
          params: { id: this.removeItem.id }
        });
        const orders = this.orders.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("shop/order/setAll", orders);
      }
    },

    async reload() {
      const data = {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
            order: [["createdAt", "DESC"]],
            include: ["orderstatus", "delivery"]
          }
        }
      };
      await this.$store.dispatch("shop/order/findAll", data);
      await this.$store.dispatch("shop/order/count", {});

      this.order_status = "";
      this.order_num = "";
    },

    async search() {
      const data = {};
      if (this.order_status !== "") {
        data.orderstatusId = this.order_status;
      }

      if (this.order_num !== "") {
        data.order_num = this.order_num;
      }
      await this.$store.dispatch("shop/order/findAll", {
        query: {
          filter: {
            where: {
              ...data
            },
            include: ["orderstatus", "delivery"]
          }
        }
      });
    }
  }
};
</script>

<style lang="sass">
  .order-status-color
    width: 50px
    height: 30px
  .table--item-link
    border-bottom: 1px solid
    cursor: pointer
</style>
