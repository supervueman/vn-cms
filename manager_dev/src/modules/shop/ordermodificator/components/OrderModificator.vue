<template lang="pug">
  v-card(outlined)
    v-card-text.px-4.pt-4
      v-text-field(
        v-model="item.slug"
        :label="`${d.slug || 'Slug'}:`"
        required
        @input="$v.item.slug.$touch()"
        @blur="$v.item.slug.$touch()"
        :error-messages="slugErrors"
      )

      v-text-field(
        v-model="item.title"
        :label="`${d.name || 'Name'}:`"
        required
      )

      v-select(
        v-model="item.target"
        :items="['cart-price', 'other']"
        :label="`${d.target || 'Target'}:`"
        required
      )

      v-select(
        v-model="item.operator"
        :items="operators"
        :label="`${d.operator || 'Operator'}:`"
        required
      )
    v-card-actions.px-4.pb-4
      v-btn(
        @click="update"
        color="primary"
        depressed
        v-if="operationType === 'update' && adminAccess"
      ) {{d.save || 'Save'}}
      v-btn(
        @click="create"
        color="primary"
        depressed
        v-if="operationType === 'create' && adminAccess"
      ) {{d.create || 'Create'}}
      v-btn(
        @click="remove"
        color="error"
        depressed
        v-if="operationType === 'update' && adminAccess"
      ) {{d.remove || 'Remove'}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

// Data
import operators from "../models/oprators.json";

export default {
  name: "OrderModificatorLayerComponent",

  mixins: [validationMixin],

  validations: {
    item: {
      slug: { required, alpha, minLength: minLength(3) }
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

  data: () => ({
    operators
  }),

  computed: {
    slugErrors() {
      const errors = [];
      if (!this.$v.item.slug.$dirty) return errors;
      !this.$v.item.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.item.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.item.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error && this.adminAccess) {
        await this.$store.dispatch("shop/ordermodificator/update", {
          params: {
            id: this.item.id
          },
          body: this.item
        });
        this.$emit("update", this.item);
      }
    },

    async create() {
      this.$v.$touch();
      if (!this.$v.$error && this.adminAccess) {
        await this.$store.dispatch("shop/ordermodificator/create", {
          body: this.item
        });
        this.$emit("create", this.item);
        this.$store.dispatch("shop/ordermodificator/clear");
      }
    },

    async remove() {
      if (this.adminAccess) {
        await this.$store.dispatch("shop/ordermodificator/remove", {
          params: {
            id: this.item.id
          }
        });
        const orderstatuses = this.$store.getters[
          "shop/ordermodificator/getAll"
        ].filter(el => {
          if (el.id !== this.item.id) {
            return el;
          }
        });
        this.$store.dispatch("shop/ordermodificator/setAll", orderstatuses);
        this.$store.dispatch("shop/ordermodificator/clear");
        this.$emit("remove", this.item);
      }
    }
  }
};
</script>
