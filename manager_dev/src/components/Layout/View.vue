<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex
        v-tabs(
          grow
          slider-color="primary"
          v-model="tab"
        )
          v-tab {{d.common_data}}
          //- v-tab Дополнительные поля
          v-tab-item
            v-flex.xs12.md12.pt-4
              v-card
                v-card-text {{d.common_data}}
                v-card-text
                  v-layout.wrap
                    v-flex.md12
                      v-text-field(
                        v-model="layout.slug"
                        :label="`${d.slug}:`"
                        required
                        @input="$v.layout.slug.$touch()"
                        @blur="$v.layout.slug.$touch()"
                        :error-messages="slugErrors"
                      )
                      v-text-field(
                        v-model="layout.title"
                        :label="`${d.name}:`"
                        required
                        @input="$v.layout.title.$touch()"
                        @blur="$v.layout.title.$touch()"
                        :error-messages="titleErrors"
                      )
            //- v-tab-item
            //-   v-flex.pt-4
            //-     v-card
                  //- fields
    v-card
      v-card-actions
        v-btn.ml-2(
          color="primary"
          @click="create"
          v-if="r.is_layout_create && operationType === 'create'"
        ) {{d.create}}
        v-btn.ml-2(
          color="primary"
          @click="update"
          v-if="r.is_layout_update && operationType === 'update'"
        ) {{d.save}}
        v-btn.ml-2(
          color="error"
          @click="isRemoveDialog = true"
          v-if="r.is_layout_delete && operationType === 'update'"
        ) {{d.remove}}
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="layout.title"
      )
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "LayoutView",

  // components: {
  // Fields
  // },

  mixins: [validationMixin],

  props: {
    operationType: {
      type: String,
      default: "create"
    },
    layout: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  validations: {
    layout: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      menu: false,
      isRemoveDialog: false,
      tab: null
    };
  },

  computed: {
    slugErrors() {
      const errors = [];
      if (!this.$v.layout.slug.$dirty) return errors;
      !this.$v.layout.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.layout.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.layout.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.layout.title.$dirty) return errors;
      !this.$v.layout.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.layout.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    async create() {
      if (!this.r.is_layout_create) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("layout/create", { body: this.layout });
      }
    },

    async update() {
      if (!this.r.is_layout_update) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("layout/update", { body: this.layout });
      }
    },

    async remove() {
      if (!this.r.is_layout_delete) {
        return;
      }
      await this.$store.dispatch("layout/remove", {
        body: { id: this.layout.id }
      });
    }
  }
};
</script>
