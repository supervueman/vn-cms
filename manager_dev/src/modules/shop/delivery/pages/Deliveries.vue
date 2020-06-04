<template lang="pug">
  v-flex(v-if="r.is_delivery_read")
    .body-2.mb-6.mt-2 {{d.deliveries || 'Deliveries'}}
    v-card(outlined)
      v-toolbar(flat)
        v-spacer
        v-btn(
          color="primary"
          depressed
          @click="isOpenItem = true; operationType = 'create'"
        ) {{d.delivery_create || "Create delivery"}}
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
                a.table--item-link(@click="openDeliveryItem(item); operationType = 'update'") {{ item.slug }} ({{item.id}})
              td.text-xs-left
                div {{ item.title }}
              td.text-xs-left
                div {{ item.country }}, {{item.region}}, {{item.city}}, {{item.district}}, {{item.street}}, {{item.house}}, {{item.apartment}}
              td.text-xs-left
                div {{item.fullAddress}}
              td.text-xs-left
                div {{ item.cost }}
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="removeItem = item; isRemoveDialog = true;"
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

    v-dialog(
      v-model="isOpenItem"
      max-width="700px"
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
      title: `${this.d.deliveries || "Deliveries"}`
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
          text: this.d.slug || "Slug",
          value: "slug"
        },
        {
          text: this.d.name || "Name",
          value: "title"
        },
        {
          text: this.d.address || "Address",
          value: "country"
        },
        {
          text: this.d.full_address || "Full address",
          value: "country"
        },
        {
          text: this.d.cost || "Cost",
          value: "cost"
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
    await this.$store.dispatch("shop/delivery/count", {});
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
      if (this.r.is_delivery_delete) {
        await this.$store.dispatch("shop/delivery/remove", {
          params: { id: this.removeItem.id }
        });
        const deliveries = this.deliveries.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("shop/delivery/setAll", deliveries);
      }
    },

    async openDeliveryItem(item) {
      if (this.r.is_delivery_read) {
        this.$store.dispatch("shop/delivery/clear");
        await this.$store.dispatch("shop/delivery/findByPk", {
          params: {
            id: item.id
          }
        });

        await this.$store.dispatch("context/findAll", {
          query: {
            filter: {
              order: [["createdAt", "DESC"]]
            }
          }
        });
        this.isOpenItem = true;
      }
    }
  }
};
</script>

<style lang="sass">
.table--item-link
  border-bottom: 1px solid
  cursor: pointer
</style>
