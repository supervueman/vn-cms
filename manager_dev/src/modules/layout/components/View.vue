<template lang="pug">
  v-flex
    v-layout.wrap
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
        v-layout
          v-flex
            v-card
              v-card-text
                ace(
                  v-model="content.code"
                  @init="editorInit"
                  lang="html"
                  theme="monokai"
                  width="100%"
                  height="500"
                )
              v-card-actions
                v-btn.ml-2(
                  @click="create"
                  color="primary"
                  v-if="operationType === 'create'"
                ) {{d.save || "Сохранить"}}
                v-btn.ml-2(
                  @click="update"
                  color="primary"
                  v-if="operationType === 'update'"
                ) {{d.save || "Сохранить"}}
                v-btn(
                  @click="remove"
                  color="error"
                  v-if="operationType === 'update'"
                ) {{d.delete || "Удалить"}}
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
    content() {
      return this.$store.getters["ide/getLayout"];
    },
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
        await this.saveContent();
      }
    },

    async update() {
      if (!this.r.is_layout_update) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("layout/update", { body: this.layout });
        await this.saveContent();
      }
    },

    async remove() {
      if (!this.r.is_layout_delete) {
        return;
      }
      await this.$store.dispatch("layout/remove", {
        body: { id: this.layout.id }
      });
    },

    async saveContent() {
      await this.$store.dispatch("ide/saveLayout", {
        body: {
          name: this.layout.slug,
          content: this.content.code
        }
      });
    }
  }
};
</script>
