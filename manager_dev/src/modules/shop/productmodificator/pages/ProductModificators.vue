<template lang="pug">
  v-flex(v-if="r.is_productmodificator_read")
    .body-2.mb-6.mt-2 {{d.product_modificators || 'Product modificators'}}
    v-card(outlined)
      v-toolbar(flat)
        v-spacer
        v-btn(
          depressed
          color="primary"
          v-if="adminAccess"
          @click="isOpenItem = true; operationType = 'create'; $store.dispatch('shop/ordermodificator/clear')"
        ) {{d.modificator_create || "Create modificator"}}
      v-data-table(
        :headers="headers"
        :items="productmodificators"
        :items-per-page-options="[limit]"
        hide-default-footer
      )
        template(v-slot:body="{items}")
          tbody
            tr(v-for="item in items" :key="item.id")
              td.text-xs-left
                a.table--item-link(@click="openOrderModificatorItem(item); operationType = 'update'") {{ item.slug }}
              td.text-xs-left
                a.table--item-link(@click="openOrderModificatorItem(item); operationType = 'update'") {{ item.title }}
              td.text-xs-left {{item.target}}
              td.text-xs-left {{item.operator}}
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="isRemoveDialog = true; removeItem = item;"
                  v-if="adminAccess"
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
      max-width="500px"
      @click:outside="$store.dispatch('shop/ordermodificator/clear'); operationType = 'create'"
    )
      product-modificator(
        :operationType="operationType"
        :item="productmodificator"
        @remove="operationType = 'create'; isOpenItem = false"
        @create="operationType = 'create'; isOpenItem = false"
      )
</template>

<script>
// Components
import ProductModificator from "../components/ProductModificator";

export default {
  name: "ProductModificatorsPage",

  metaInfo() {
    return {
      title: `${this.d.product_modificators || "Product modificators"}`
    };
  },

  components: {
    ProductModificator
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
          text: this.d.target || "Target",
          value: "target"
        },
        {
          text: this.d.operator || "Operator",
          value: "operator"
        },
        { text: "", sortable: false }
      ];
    },
    productmodificators() {
      return this.$store.getters["shop/productmodificator/getAll"];
    },
    productmodificator() {
      return this.$store.getters["shop/productmodificator/get"];
    },
    count() {
      return this.$store.getters["shop/productmodificator/getCount"];
    }
  },

  async mounted() {
    if (this.r.is_productmodificator_read) {
      const data = {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
            order: [["createdAt", "DESC"]]
          }
        }
      };
      await this.$store.dispatch("shop/productmodificator/findAll", data);
      await this.$store.dispatch("shop/productmodificator/count", {});
    }
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
      await this.$store.dispatch("shop/productmodificator/findAll", data);
    },

    async remove() {
      if (this.adminAccess) {
        await this.$store.dispatch("shop/productmodificator/remove", {
          params: { id: this.removeItem.id }
        });
        const productmodificators = this.productmodificators.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch(
          "shop/productmodificator/setAll",
          productmodificators
        );
      }
    },

    async openOrderModificatorItem(item) {
      if (this.r.is_ordermodificator_read) {
        await this.$store.dispatch("shop/productmodificator/findByPk", {
          params: {
            id: item.id
          }
        });
        this.isOpenItem = true;
      }
    }
  }
};
</script>
