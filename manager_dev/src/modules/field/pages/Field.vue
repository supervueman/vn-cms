<template lang="pug">
  v-flex(v-if="r.is_field_read")
    .body-2.mb-12.mt-2 {{d.field || 'Поле'}}: {{field.title}} ({{field.id}})
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card(outlined)
          v-card-text {{d.common_data || 'Общие данные'}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="field.slug"
                  :label="`${d.slug || 'Псевдоним'}:`"
                  @input="$v.field.slug.$touch()"
                  @blur="$v.field.slug.$touch()"
                  :error-messages="slugErrors"
                )
                v-text-field(
                  v-model="field.title"
                  :label="`${d.name || 'Наименование'}:`"
                  @input="$v.field.title.$touch()"
                  @blur="$v.field.title.$touch()"
                  :error-messages="titleErrors"
                )
      v-flex.xs12.md5.pl-2
        field-secondary-data
      v-flex.xs12.md7.pr-2.mt-4
        v-card(outlined)
          field-settings-data
          v-card-actions.pb-4
            v-btn.ml-2(
              color="primary"
              @click="update"
              depressed
              v-if="r.is_field_update"
            ) {{d.save|| 'Сохранить'}}

      v-flex.xs12.md7.pr-2
        .d-flex.justify-center.mt-3
          v-btn(
            text
            color="error"
            depressed
            @click="isRemoveDialog = true"
          ) {{d.remove || 'Удалить'}}

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

// Components
import FieldSecondaryData from "../components/FieldSecondaryData";
import FieldSettingsData from "../components/FieldSettingsData";

export default {
  name: "FieldPage",

  components: {
    FieldSecondaryData,
    FieldSettingsData
  },

  mixins: [validationMixin],

  validations: {
    field: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  metaInfo() {
    return {
      title: `${this.d.field || "Поле"}: ${this.field.title}`
    };
  },

  data: () => ({
    isRemoveDialog: false
  }),

  computed: {
    field() {
      return this.$store.getters["field/get"];
    },
    oldLayouts() {
      return this.$store.getters["field/getLayouts"];
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
    }
  },

  async mounted() {
    await this.$store.dispatch("field/findByPk", {
      params: {
        id: this.$route.params.id
      },
      query: {
        filter: {
          include: ["layouts", "category"]
        }
      }
    });
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (this.r.is_field_update && !this.$v.$error) {
        const _ = this;
        // Фильтруем шаблоны которые добавились
        const addedLayouts = this.field.layouts.filter(
          i => _.oldLayouts.indexOf(i) < 0
        );

        // Фильтруем шаблоны которые удалились
        const removedLayouts = this.oldLayouts.filter(
          i => _.field.layouts.indexOf(i) < 0
        );

        await this.$store.dispatch("field/update", {
          body: this.field,
          params: {
            id: this.field.id
          }
        });

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
      if (this.r.is_field_delete) {
        // Сначала отвязываем все шаблоны
        await this.$store.dispatch("field/removeLayout", {
          body: {
            id: this.field.id,
            layouts: this.field.layouts
          }
        });

        const bool = await this.$store.dispatch("field/remove", {
          params: { id: this.field.id }
        });

        if (bool) {
          this.$router.push("/fields");
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("field/clear");
    this.$store.dispatch("field/clearLayouts");
    next();
  }
};
</script>
