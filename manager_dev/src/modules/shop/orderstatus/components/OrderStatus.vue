<template lang="pug">
  v-card(outlined)
    v-card-text.px-4.pt-4
      v-text-field(
        v-model="item.title"
        :label="`${d.name}:`"
        required
        @input="$v.item.title.$touch()"
        @blur="$v.item.title.$touch()"
        :error-messages="titleErrors"
      )
      v-color-picker(
        outlined
        v-model="item.color"
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
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.item.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error && this.adminAccess) {
        await this.$store.dispatch("shop/orderstatus/update", {
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
        await this.$store.dispatch("shop/orderstatus/create", {
          body: this.item
        });
        this.$emit("create", this.item);
        this.$store.dispatch("shop/orderstatus/clear");
      }
    },

    async remove() {
      if (this.adminAccess) {
        await this.$store.dispatch("shop/orderstatus/remove", {
          params: {
            id: this.item.id
          }
        });
        const orderstatuses = this.$store.getters[
          "shop/orderstatus/getAll"
        ].filter(el => {
          if (el.id !== this.item.id) {
            return el;
          }
        });
        this.$store.dispatch("shop/orderstatus/setAll", orderstatuses);
        this.$store.dispatch("shop/orderstatus/clear");
        this.$emit("remove", this.item);
      }
    }
  }
};
</script>

<style lang="sass">
  .v-color-picker
    box-shadow: none
  .v-color-picker__controls
    border: 1px solid rgba(0, 0, 0, 0.12)
</style>
