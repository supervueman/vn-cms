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
          td {{item.fields.article}}
          td {{item.OrderResource.quantity}}
          td {{item.fields.price}}
          td {{item.fields.weight}}
          td {{item.fields.weight * item.OrderResource.quantity}}
          td {{item.fields.price * item.OrderResource.quantity}}
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
          if (product.fields.price) {
            summ += product.fields.price * product.OrderResource.quantity;
          }
        });
      }
      return summ;
    },
    summWeight() {
      let summ = 0;
      if (this.products && this.products.length > 0) {
        this.products.forEach(product => {
          if (product.fields.weight) {
            summ += product.fields.weight * product.OrderResource.quantity;
          }
        });
      }
      return summ;
    }
  }
};
</script>
