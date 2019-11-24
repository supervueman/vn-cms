<template lang="pug">
  v-layout
    v-flex
      v-flex
        .body-2.mb-6.mt-2 {{d.orders || 'Заказы'}}
      v-card
        shop-toolbar
        v-container
          v-toolbar(flat)
            //- v-spacer
            //- v-btn(
            //-   color="primary"
            //-   @click="$store.dispatch('shop/order/clear'); isOpenItem = true"
            //- ) {{d.order_create || "Создать заказ"}}
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
                    a(@click.prevent="openOrderItem(item); operationType = 'update'") {{ item.order_num }}
                  td.text-xs-left
                    router-link(:to="`/users/${item.owner ? item.owner.id : ''}`") {{ item.owner ? item.owner.lastname : '' }} {{ item.owner ? item.owner.firstname : '' }}
                  td.text-xs-left
                    router-link(:to="`/users/${item.manager ? item.manager.id : ''}`") {{ item.manager ? item.manager.lastname : '' }} {{ item.manager ? item.manager.firstname : '' }}
                  td.text-xs-left {{item.price}}
                  td.text-xs-left
                    div(:style="{color: item.orderstatus ? item.orderstatus.color : ''}") {{item.orderstatus ? item.orderstatus.title : ''}}
          div.text-xs-center.pt-2
            pagination(
              :itemsLength="count"
              @getPage="getPage"
              :limit="limit"
            )
    v-dialog(
      v-model="isOpenItem"
      max-width="800px"
      @click:outside="$store.dispatch('shop/order/clear'); operationType = 'create'"
    )
      order(
        :operationType="operationType"
        :item="order"
        @remove="operationType = 'create'; isOpenItem = false"
        @create="operationType = 'create'; isOpenItem = false"
      )
</template>

<script>
// Components
import ShopToolbar from "../components/ShopToolbar";
import Order from "../order/components/Order";

export default {
  name: "ShopPage",

  metaInfo() {
    return {
      title: `${this.d.orders || "Заказы"}`
    };
  },

  components: {
    ShopToolbar,
    Order
  },

  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 10,
      isOpenItem: false,
      operationType: "create"
    };
  },

  computed: {
    headers() {
      return [
        {
          text: this.d.order_number || "Номер заказа",
          value: "order_num"
        },
        {
          text: this.d.customer || "Заказчик",
          value: "lastname"
        },
        {
          text: this.d.manager || "Менеджер",
          value: "lastname"
        },
        { text: this.d.summ || "Сумма", value: "price" },
        { text: this.d.order_status || "Статус заказа", value: "orderstatus" }
      ];
    },
    orders() {
      return this.$store.getters["shop/order/getAll"];
    },
    order() {
      return this.$store.getters["shop/order/get"];
    },
    count() {
      return this.$store.getters["shop/order/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]],
          include: ["owner", "manager", "orderstatus"]
        }
      }
    };
    await this.$store.dispatch("shop/order/findAll", data);
    await this.$store.dispatch("shop/order/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: ["owner", "manager", "orderstatus"]
          }
        }
      };
      await this.$store.dispatch("shop/order/findAll", data);
    },

    async openOrderItem(item) {
      this.isOpenItem = true;
      await this.$store.dispatch("shop/order/findByPk", {
        params: {
          id: item.id
        },
        query: {
          filter: {
            include: [
              "owner",
              "manager",
              "orderstatus",
              "delivery",
              {
                association: "products"
              }
            ]
          }
        }
      });
    }
  }
};
</script>
