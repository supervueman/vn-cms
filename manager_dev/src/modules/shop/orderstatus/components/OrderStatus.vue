<template lang="pug">
  v-card
    v-card-title(:style="{'color': item.color}") {{item.title}}
    v-card-text
      v-text-field(
        v-model="item.title"
        :label="`${d.name}:`"
        required
        @input="$v.item.title.$touch()"
        @blur="$v.item.title.$touch()"
        :error-messages="titleErrors"
      )
      v-color-picker(
        v-model="item.color"
      )
    v-card-actions
      v-btn(@click="update" color="primary" v-if="operationType === 'update'") Сохранить
      v-btn(@click="create" color="primary" v-if="operationType === 'create'") Создать
      v-btn(@click="remove" color="error" v-if="operationType === 'update'") Удалить
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

export default {
  name: "OrderStatus",

  mixins: [validationMixin],

  validations: {
    item: {
      title: { required, minLength: minLength(3) }
    }
  },

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
    titleErrors() {
      const errors = [];
      if (!this.$v.item.title.$dirty) return errors;
      !this.$v.item.title.minLength &&
        errors.push("Наменование должено быть не менее 3 символов!");
      !this.$v.item.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("shop/orderstatus/update", {
          body: this.item
        });
        this.$emit("update", this.item);
      }
    },

    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("shop/orderstatus/create", {
          body: this.item
        });
        this.$emit("create", this.item);
        this.$store.dispatch("shop/orderstatus/clear");
      }
    },

    async remove() {
      await this.$store.dispatch("shop/orderstatus/remove", {
        body: this.item
      });
      this.$store.dispatch("shop/orderstatus/clear");
      this.$emit("remove", this.item);
    }
  }
};
</script>
