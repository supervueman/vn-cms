<template lang="pug">
  v-card
    v-tabs(
      background-color="primary"
      class="elevation-2"
      dark
      centered
      grow
    )
      v-tabs-slider
      v-tab {{d.order || 'Заказ'}}
      v-tab-item
        v-card-text
          v-layout(flex-wrap)
            v-flex.lg12.md12.mr-2
              v-layout.mb-4
                v-flex.lg6.md6.mr-2
                  v-text-field(
                    :label="d.customer || 'Заказчик'"
                    :value="`${item.owner ? item.owner.lastname : ''} ${item.owner ? item.owner.firstname : ''}`"
                  )
                  v-text-field(
                    :label="d.manager || 'Менеджер'"
                    :value="`${item.manager ? item.manager.lastname : ''} ${item.manager ? item.manager.firstname : ''}`"
                  )
                v-flex.lg6.md6.ml-2
                  v-text-field(
                    v-model="item.order_num"
                  )
                  div.mb-4 {{d.created_date || 'Дата создания'}}: {{item.createdAt}}
                  div.mb-4 {{d.updated_date || 'Дата обновления'}}: {{item.updatedAt}}
                  div.mb-4 {{d.delivery || 'Доставка'}}: {{item.delivery.cost}}
                  div {{d.summ || "Сумма"}}: {{item.price + item.delivery.cost}}
            v-flex.lg12.md12
              v-layout
                v-flex.lg12.md12.mr-2
                  v-select(
                    v-model="item.deliveryId"
                    :label="d.delivery || 'Доставка'"
                    :items="deliveries"
                    item-text="title"
                    item-value="id"
                  )
                  v-select(
                    v-model="item.orderstatusId"
                    :items="orderstatuses"
                    item-text="title"
                    item-value="id"
                    :label="d.order_status || 'Статус заказа'"
                  )
                v-flex.lg12.md12.ml-2
                  v-textarea(
                    :label="d.comment || 'Комментарий'"
                    v-model="item.comment"
                  )
        v-card-actions
          v-btn(@click="update" color="primary" v-if="operationType === 'update'") Сохранить
          v-btn(@click="create" color="primary" v-if="operationType === 'create'") Создать
          v-btn(@click="remove" color="error" v-if="operationType === 'update'") Удалить
      v-tab {{d.products || 'Товары'}}
      v-tab-item
        v-card-text
          order-products(
            :products="item.products"
          )

      v-tab {{d.delivery || 'Доставка'}}
      v-tab-item
        v-card-text
          order-delivery(
            :item="item.delivery_info"
          )
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

// Components
import OrderProducts from "./OrderProducts";
import OrderDelivery from "./OrderDelivery";

export default {
  name: "Order",

  components: {
    OrderProducts,
    OrderDelivery
  },

  mixins: [validationMixin],

  // validations: {
  //   item: {
  //     title: { required, minLength: minLength(3) }
  //   }
  // },

  props: {
    operationType: {
      type: String,
      default: "create"
    },
    item: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    orderstatuses() {
      return this.$store.getters["shop/orderstatus/getAll"];
    },
    deliveries() {
      return this.$store.getters["shop/delivery/getAll"];
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.item.title.$dirty) return errors;
      !this.$v.item.title.minLength &&
        errors.push("Наменование должено быть не менее 3 символов!");
      !this.$v.item.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    };
    await this.$store.dispatch("shop/orderstatus/findAll", data);
    await this.$store.dispatch("shop/delivery/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async update() {
      // this.$v.$touch();
      // if (!this.$v.$error) {

      for (const elem in this.item.delivery_info) {
        this.item.delivery_info[elem] = this.item.delivery_info[elem].value;
      }
      this.item.delivery_info = JSON.stringify(this.item.delivery_info);
      await this.$store.dispatch("shop/order/update", {
        body: this.item,
        query: {
          filter: {
            include: [
              "owner",
              "manager",
              "orderstatus",
              "delivery",
              {
                association: "products",
                include: [
                  {
                    association: "productfields"
                  }
                ]
              }
            ]
          }
        }
      });
      this.$emit("update", this.item);
      // }
    },

    async create() {
      // this.$v.$touch();
      // if (!this.$v.$error) {
      this.item.products = [{ id: 1, quantity: 2 }, { id: 2, quantity: 3 }];
      this.item.delivery_info =
        '{"email": "chaogen2@gmail.com", "address": "ул. Московское Шоссе"}';
      await this.$store.dispatch("shop/order/create", {
        body: this.item
      });
      this.$emit("create", this.item);
      this.$store.dispatch("shop/order/clear");
      // }
    },

    async remove() {
      await this.$store.dispatch("shop/order/remove", {
        body: this.item
      });
      this.$store.dispatch("shop/order/clear");
      this.$emit("remove", this.item);
    }
  }
};
</script>
