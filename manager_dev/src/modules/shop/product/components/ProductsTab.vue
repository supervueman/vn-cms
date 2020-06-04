<template lang="pug">
  v-card(outlined)
    v-toolbar(flat color="white")
      v-spacer
      v-btn(
        color="primary"
        :to="`/shop/product-create?level=${product.level}&parentId=${product.id}&contextId=${product.contextId}`"
        depressed
        v-if="r.is_product_create && mainLang === product.lang"
      ) {{d.create_product || 'Create product'}}
    v-data-table(
      :headers="headers"
      :items="products"
      :items-per-page-options="[limit]"
      hide-default-footer
    )
      template(v-slot:body="{items}")
        tbody
          tr(v-for="item in items" :key="item.id")
            td.text-xs-left
              router-link(
                :to="`/shop/products/${item.id}`"
              ) {{ item.title }} ({{item.id}})
            td.text-xs-left {{item.slug}}
            td.text-xs-left {{item.createdAt}}
            td.text-end
              v-btn(
                text
                fab
                color="primary"
                @click="removeDialogOpen(item)"
                v-if="r.is_product_delete" 
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
  name: "ProductsTab",

  data() {
    return {
      isRemoveDialog: false,
      removeItem: {},
      limit: 10
    };
  },

  computed: {
    headers() {
      return [
        { text: `${this.d.name || "Name"}`, value: "title" },
        { text: `${this.d.slug || "Slug"}`, value: "slug" },
        {
          text: `${this.d.creation_date || "Date creation"}`,
          value: "createdAt"
        },
        { text: "", sortable: false }
      ];
    },
    product() {
      return this.$store.getters["shop/product/get"];
    },
    products() {
      return this.$store.getters["shop/product/getAll"];
    },
    count() {
      return this.$store.getters["shop/product/getCount"];
    }
  },

  methods: {
    async getPage({ offset, limit }) {
      await this.$store.dispatch("shop/product/findAll", {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            where: {
              level: this.product.level + 1,
              parentId: this.product.id,
              lang: this.product.lang
            }
          }
        }
      });
    },

    async remove() {
      if (this.r.is_product_delete) {
        await this.$store.dispatch("shop/product/remove", {
          body: { id: this.removeItem.id }
        });
        const products = this.products.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("shop/product/setAll", products);
      }
    },

    removeDialogOpen(product) {
      this.removeItem = product;
      this.isRemoveDialog = true;
    }
  }
};
</script>
