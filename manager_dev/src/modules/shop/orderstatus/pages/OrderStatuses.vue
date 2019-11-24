<template lang="pug">
  v-layout
    v-flex
      v-flex
        .body-2.mb-6.mt-2 {{d.order_statuses || 'Статусы заказа'}}
      v-card
        shop-toolbar
        v-container
          v-toolbar(flat)
            v-spacer
            v-btn(
              color="primary"
              @click="isOpenItem = true; operationType = 'create'; $store.dispatch('shop/orderstatus/clear')"
            ) {{d.order_status_create || "Создать статус заказа"}}
          v-data-table(
            :headers="headers"
            :items="orderstatuses"
            :items-per-page-options="[limit]"
            hide-default-footer
          )
            template(v-slot:body="{items}")
              tbody
                tr(v-for="item in items" :key="item.id")
                  td.text-xs-left
                    div(@click="openOrderStatusItem(item); operationType = 'update'") {{ item.title }}
                  td.text-xs-left
                    div.order-status-color(:style="{'background-color': item.color}")
                  td.text-end
                    v-btn(
                      text
                      fab
                      color="primary"
                      @click="removeDialogOpen(item)"
                    )
                      v-icon delete
          div.text-xs-center.pt-2
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

    v-dialog(
      v-model="isOpenItem"
      max-width="500px"
      @click:outside="$store.dispatch('shop/orderstatus/clear'); operationType = 'create'"
    )
      order-status(
        :operationType="operationType"
        :item="orderstatus"
        @remove="operationType = 'create'; isOpenItem = false"
        @create="operationType = 'create'; isOpenItem = false"
      )
</template>

<script>
// Components
import ShopToolbar from "../../components/ShopToolbar";
import OrderStatus from "../components/OrderStatus";

export default {
  name: "OrderStatusesPage",

  metaInfo() {
    return {
      title: `${this.d.order_statuses || "Статусы заказа"}`
    };
  },

  components: {
    ShopToolbar,
    OrderStatus
  },

  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      isRemoveDialog: false,
      removeItem: {},
      limit: 10,
      isOpenItem: false,
      operationType: "create"
    };
  },

  computed: {
    headers() {
      return [
        {
          text: this.d.name || "Наименование",
          value: "title"
        },
        {
          text: this.d.color || "Цвет",
          value: "color"
        },
        { text: "", sortable: false }
      ];
    },
    orderstatuses() {
      return this.$store.getters["shop/orderstatus/getAll"];
    },
    orderstatus() {
      return this.$store.getters["shop/orderstatus/get"];
    },
    count() {
      return this.$store.getters["shop/orderstatus/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]]
        }
      }
    };
    await this.$store.dispatch("shop/orderstatus/findAll", data);
    await this.$store.dispatch("shop/orderstatus/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]]
          }
        }
      };
      await this.$store.dispatch("shop/orderstatus/findAll", data);
    },

    async remove() {
      await this.$store.dispatch("shop/orderstatus/remove", {
        body: { id: this.removeItem.id }
      });
      const orderstatuses = this.orderstatuses.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("shop/orderstatus/setAll", orderstatuses);
    },

    removeDialogOpen(item) {
      this.removeItem = item;
      this.isRemoveDialog = true;
    },

    async openOrderStatusItem(item) {
      this.isOpenItem = true;
      await this.$store.dispatch("shop/orderstatus/findByPk", {
        params: {
          id: item.id
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
</style>
