<template lang="pug">
  v-card(outlined)
    v-data-table(
      :headers="headers"
      :items="order.products"
      hide-default-footer
    )
      template(v-slot:body="{items}")
        tbody
          tr(v-for="item in items" :key="item.id")
            td
              router-link(:to="`/shop/products/${item.id}`") {{item.title}}
            td {{item.article}}
            td
              .d-flex.align-center
                span.mr-2.title.operator(
                  @click="changeQuantity('-', item)"
                  v-if="r.is_order_update"
                ) -
                span {{item.OrderProduct.quantity}}
                span.ml-2.title.operator(
                  @click="changeQuantity('+', item)"
                  v-if="r.is_order_update"
                ) +
            td {{item.weight}}
            td {{item.price}}

            td(@click="openModificatorsDialog(item)")
              a(v-if="item.OrderProduct.modificators.length > 1")
                span {{(item.OrderProduct.modificators.reduce((acc, el) => +acc.weight + Number(el.weight))) * item.OrderProduct.quantity}}
              a(v-else-if="item.OrderProduct.modificators.length === 1")
                span {{item.OrderProduct.modificators[0].weight * item.OrderProduct.quantity}}
              a(v-else) 0

            td(@click="openModificatorsDialog(item)")
              a(v-if="item.OrderProduct.modificators.length > 1")
                span {{(item.OrderProduct.modificators.reduce((acc, el) => +acc.price + Number(el.price))) * item.OrderProduct.quantity}}
              a(v-else-if="item.OrderProduct.modificators.length === 1")
                span {{(item.OrderProduct.modificators[0].price) * item.OrderProduct.quantity}}
              a(v-else) 0

            td {{item.weight * item.OrderProduct.quantity}}
            td {{item.price * item.OrderProduct.quantity}}
            td.text-end
              v-btn(
                text
                fab
                color="primary"
                v-if="r.is_order_update"
                @click="removeItem(item)"
              )
                v-icon delete
          tr
            td {{d.total || "Total:"}}
            td
            td
            td
            td
            td {{summWeightModificators}}
            td {{summPriceModificators}}
            td {{summWeight}}
            td {{summPrice}}
            td
          tr
            td {{d.total_with_modificators || "Total with modificators:"}}
            td
            td
            td
            td
            td
            td
            td {{summWeightWithModificators}}
            td {{summPriceWithModificators}}
            td

    v-divider.my-4

    products

    v-dialog(
      v-model="isProductModificators"
      width="500"
    )
      product-modificators-dialog(
        :item="productItem"
      )
</template>

<script>
import Products from "./Products";
import ProductModificatorsDialog from "./ProductModificatorsDialog";

export default {
  components: {
    Products,
    ProductModificatorsDialog
  },

  data: () => ({
    isProductModificators: false,
    productItem: {}
  }),

  computed: {
    order() {
      return this.$store.getters["shop/order/get"];
    },
    headers() {
      return [
        { text: this.d.name || "Name", value: "title" },
        { text: this.d.article || "Article", sortable: false },
        { text: this.d.quantity || "Quantity", sortable: false },
        { text: this.d.weight || "Weight", sortable: false },
        { text: this.d.price || "Price", sortable: false },
        {
          text: `${this.d.modificators || "Modificators"} (${this.d.weight ||
            "Weight"})`,
          sortable: false
        },
        {
          text: `${this.d.modificators || "Modificators"} (${this.d.price ||
            "Price"})`,
          sortable: false
        },
        { text: this.d.total_weight || "Total weight", sortable: false },
        { text: this.d.summ || "Summ", sortable: false },
        { text: "", sortable: false }
      ];
    },
    summPrice() {
      let summ = 0;
      if (this.order.products && this.order.products.length) {
        this.order.products.forEach(product => {
          if (product.price) {
            summ += product.price * product.OrderProduct.quantity;
          }
        });
      }
      return summ;
    },
    summWeight() {
      let summ = 0;
      if (this.order.products && this.order.products.length > 0) {
        this.order.products.forEach(product => {
          if (product.weight) {
            summ += product.weight * product.OrderProduct.quantity;
          }
        });
      }
      return summ;
    },

    summPriceModificators() {
      let summ = 0;
      if (this.order.products && this.order.products.length) {
        this.order.products.forEach(product => {
          if (product.OrderProduct.modificators) {
            product.OrderProduct.modificators.forEach(el => {
              summ += Number(el.price) * product.OrderProduct.quantity;
            });
          }
        });
      }
      return summ;
    },

    summWeightModificators() {
      let summ = 0;
      if (this.order.products && this.order.products.length > 0) {
        this.order.products.forEach(product => {
          if (product.OrderProduct.modificators) {
            product.OrderProduct.modificators.forEach(el => {
              summ += Number(el.weight) * product.OrderProduct.quantity;
            });
          }
        });
      }
      return summ;
    },

    summPriceWithModificators() {
      let summ = 0;
      if (this.order.products && this.order.products.length) {
        this.order.products.forEach(product => {
          if (product.price) {
            summ += product.price * product.OrderProduct.quantity;
          }
          if (product.OrderProduct.modificators) {
            product.OrderProduct.modificators.forEach(el => {
              summ += Number(el.price) * product.OrderProduct.quantity;
            });
          }
        });
      }
      return summ;
    },
    summWeightWithModificators() {
      let summ = 0;
      if (this.order.products && this.order.products.length > 0) {
        this.order.products.forEach(product => {
          if (product.weight) {
            summ += product.weight * product.OrderProduct.quantity;
          }
          if (product.OrderProduct.modificators) {
            product.OrderProduct.modificators.forEach(el => {
              summ += Number(el.weight) * product.OrderProduct.quantity;
            });
          }
        });
      }
      return summ;
    }
  },

  methods: {
    changeQuantity(operator, item) {
      if (operator === "+") {
        item.OrderProduct.quantity += 1;
        this.order.summ += item.price;
      } else {
        if (item.OrderProduct.quantity !== 1) {
          item.OrderProduct.quantity -= 1;
          this.order.summ -= item.price;
        }
      }
    },

    async removeItem(item) {
      this.order.summ -= item.price * item.OrderProduct.quantity;
      const products = this.order.products.filter(el => {
        if (el.id !== item.id) {
          return el;
        }
      });
      this.order.products = products;

      this.$emit("removeProduct", item);
    },

    openModificatorsDialog(item) {
      this.productItem = item;
      this.isProductModificators = true;
    }
  }
};
</script>

<style lang="sass">
.operator
  cursor: pointer
</style>
