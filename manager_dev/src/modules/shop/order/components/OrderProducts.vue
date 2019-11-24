<template lang="pug">
  v-data-table(
    :headers="headers"
    :items="products"
    hide-default-footer
  )
    template(v-slot:body="{items}")
      tbody
        tr(v-for="item in items" :key="item.id")
          td
            router-link(:to="`/resources/${item.id}`") {{item.title}}
          td {{item.article}}
          td {{item.OrderProduct.quantity}}
          td {{item.price}}
          td {{item.weight}}
          td {{item.weight * item.OrderProduct.quantity}}
          td {{item.price * item.OrderProduct.quantity}}
        tr
          td {{d.total || "Итого:"}}
          td
          td
          td
          td
          td {{summWeight}}
          td {{summPrice}}
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    headers() {
      return [
        { text: this.d.name || "Наименование", value: "title" },
        { text: this.d.article || "Артикул", sortable: false },
        { text: this.d.quantity || "Количество", sortable: false },
        { text: this.d.price || "Цена", sortable: false },
        { text: this.d.weight || "Вес", sortable: false },
        { text: this.d.total_weight || "Общий вес", sortable: false },
        { text: this.d.summ || "Сумма", sortable: false }
      ];
    },
    summPrice() {
      let summ = 0;
      if (this.products && this.products.length > 0) {
        this.products.forEach(product => {
          if (product.price) {
            summ += product.price * product.OrderProduct.quantity;
          }
        });
      }
      return summ;
    },
    summWeight() {
      let summ = 0;
      if (this.products && this.products.length > 0) {
        this.products.forEach(product => {
          if (product.weight) {
            summ += product.weight * product.OrderProduct.quantity;
          }
        });
      }
      return summ;
    }
  }
};
</script>
