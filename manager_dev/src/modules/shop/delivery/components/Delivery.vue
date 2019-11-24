<template lang="pug">
  v-card
    v-card-title(:style="{'color': item.color}") {{item.title}}
    v-card-text
      v-text-field(
        v-model="item.slug"
        :label="`${d.slug}:`"
        required
        @input="$v.item.slug.$touch()"
        @blur="$v.item.slug.$touch()"
        :error-messages="slugErrors"
      )
      v-text-field(
        v-model="item.title"
        :label="`${d.name}:`"
        required
        @input="$v.item.title.$touch()"
        @blur="$v.item.title.$touch()"
        :error-messages="titleErrors"
      )
      v-textarea(
        v-model="item.value"
        :label="d.value || 'Значение'"
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

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "Delivery",

  mixins: [validationMixin],

  validations: {
    item: {
      slug: { required, alpha, minLength: minLength(3) },
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
    slugErrors() {
      const errors = [];
      if (!this.$v.item.slug.$dirty) return errors;
      !this.$v.item.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.item.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.item.slug.required && errors.push("Обязательное поле!");
      return errors;
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

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("shop/delivery/update", {
          body: this.item
        });
        this.$emit("update", this.item);
      }
    },

    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("shop/delivery/create", {
          body: this.item
        });
        this.$emit("create", this.item);
        this.$store.dispatch("shop/delivery/clear");
      }
    },

    async remove() {
      await this.$store.dispatch("shop/delivery/remove", {
        body: this.item
      });
      this.$store.dispatch("shop/delivery/clear");
      this.$emit("remove", this.item);
    }
  }
};
</script>
