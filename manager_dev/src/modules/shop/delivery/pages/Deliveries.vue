<template lang="pug">
  v-layout
    v-flex
      v-flex
        .body-2.mb-6.mt-2 {{d.delivery || 'Статусы заказа'}}
      v-card
        shop-toolbar
        v-container
          v-toolbar(flat)
            v-spacer
            v-btn(
              color="primary"
              @click="isOpenItem = true; operationType = 'create'; $store.dispatch('shop/delivery/clear')"
            ) {{d.delivery_create || "Создать доставку"}}
          v-data-table(
            :headers="headers"
            :items="deliveries"
            :items-per-page-options="[limit]"
            hide-default-footer
          )
            template(v-slot:body="{items}")
              tbody
                tr(v-for="item in items" :key="item.id")
                  td.text-xs-left
                    div(@click="openDeliveryItem(item); operationType = 'update'") {{ item.title }}
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
      @click:outside="$store.dispatch('shop/delivery/clear'); operationType = 'create'"
    )
      delivery(
        :operationType="operationType"
        :item="delivery"
        @remove="operationType = 'create'; isOpenItem = false"
        @create="operationType = 'create'; isOpenItem = false"
      )
</template>

<script>
// Components
import ShopToolbar from "../../components/ShopToolbar";
import Delivery from "../components/Delivery";

export default {
  name: "DeliveryPage",

  metaInfo() {
    return {
      title: `${this.d.deliveries || "Доставки"}`
    };
  },

  components: {
    ShopToolbar,
    Delivery
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
        { text: "", sortable: false }
      ];
    },
    deliveries() {
      return this.$store.getters["shop/delivery/getAll"];
    },
    delivery() {
      return this.$store.getters["shop/delivery/get"];
    },
    count() {
      return this.$store.getters["shop/delivery/getCount"];
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
    await this.$store.dispatch("shop/delivery/findAll", data);
    await this.$store.dispatch("shop/delivery/count", data);
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
      await this.$store.dispatch("shop/delivery/findAll", data);
    },

    async remove() {
      await this.$store.dispatch("shop/delivery/remove", {
        body: { id: this.removeItem.id }
      });
      const orderstatuses = this.orderstatuses.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("shop/delivery/setAll", orderstatuses);
    },

    removeDialogOpen(item) {
      this.removeItem = item;
      this.isRemoveDialog = true;
    },

    async openDeliveryItem(item) {
      this.isOpenItem = true;
      await this.$store.dispatch("shop/delivery/findByPk", {
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
