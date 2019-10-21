<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card
          v-card-text {{d.common_data}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="field.title"
                  :label="`${d.name}:`"
                  required
                  @input="$v.field.title.$touch()"
                  @blur="$v.field.title.$touch()"
                  :error-messages="titleErrors"
                )
                v-textarea(
                  v-model="field.defaultValue"
                  :label="`${d.default_value}:`"
                  :placeholder="d.string_or_json"
                  no-resize
                  required
                )
                v-textarea(
                  v-if="field.fieldType === 'migx'"
                  v-model="field.schema"
                  :label="`${d.schema}:`"
                  :placeholder="d.string_or_json"
                  no-resize
                  required
                )
              v-card(v-if="adminAccess")
        v-card
          v-card-actions
            v-btn.ml-2(
              color="primary"
              @click="create"
              v-if="r.is_field_create && operationType === 'create'"
            ) {{d.create}}
            v-btn.ml-2(
              color="primary"
              @click="update"
              v-if="r.is_field_update && operationType === 'update'"
            ) {{d.save}}
            v-btn.ml-2(
              color="error"
              @click="isRemoveDialog = true"
              v-if="r.is_field_delete && operationType === 'update'"
            ) {{d.remove}}

      v-flex.xs12.md5.pl-2
        v-card
          v-card-text
            v-text-field(
              v-model="field.slug"
              :label="`${d.slug}:`"
              required
              @input="$v.field.slug.$touch()"
              @blur="$v.field.slug.$touch()"
              :error-messages="slugErrors"
            )
            v-select(
              :items="fieldCategories"
              item-text="title"
              item-value="id"
              :label="`${d.field_category}:`"
              v-model="field.categoryId"
            )
            v-select(
              :items="layouts"
              item-text="title"
              item-value="id"
              :label="`${d.layout}:`"
              v-model="field.layouts"
              :error-messages="layoutErrors"
              @blur="$v.field.layouts.$touch()"
              multiple
              required
            )
            v-select(
              :items="types"
              :label="`${d.field_type}:`"
              v-model="field.fieldType"
              required
            )
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="field.title"
      )
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "FieldView",

  mixins: [validationMixin],

  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    },
    operationType: {
      type: String,
      default: "create"
    }
  },

  validations: {
    field: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) },
      layouts: { required }
    }
  },

  data() {
    return {
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    fieldCategories() {
      return this.$store.getters["fieldcategory/getAll"];
    },
    layouts() {
      return this.$store.getters["layout/getAll"];
    },
    oldLayouts() {
      return this.$store.getters["field/getLayouts"];
    },
    types() {
      return this.$store.getters["field/getTypes"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.field.slug.$dirty) return errors;
      !this.$v.field.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.field.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.field.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.field.title.$dirty) return errors;
      !this.$v.field.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.field.title.required && errors.push("Обязательное поле!");
      return errors;
    },
    layoutErrors() {
      const errors = [];
      if (!this.$v.field.layouts.$dirty) return errors;
      !this.$v.field.layouts.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
    await this.$store.dispatch("fieldcategory/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async create() {
      if (!this.r.is_field_create) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("field/create", { body: this.field });
      }
    },

    async update() {
      if (!this.r.is_field_update) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        const that = this;
        const addedLayouts = this.field.layouts.filter(
          i => that.oldLayouts.indexOf(i) < 0
        );

        const removedLayouts = this.oldLayouts.filter(
          i => that.field.layouts.indexOf(i) < 0
        );

        await this.$store.dispatch("field/update", { body: this.field });

        if (addedLayouts.length > 0) {
          await this.$store.dispatch("field/addLayout", {
            body: {
              ...this.field,
              layouts: addedLayouts
            }
          });
        }

        if (removedLayouts.length > 0) {
          await this.$store.dispatch("field/removeLayout", {
            body: {
              ...this.field,
              layouts: removedLayouts
            }
          });
        }
      }
    },

    async remove() {
      if (!this.r.is_field_delete) {
        return;
      }
      await this.$store.dispatch("field/remove", {
        body: { id: this.field.id }
      });
      this.$router.push("/fields");
    }
  }
};
</script>
