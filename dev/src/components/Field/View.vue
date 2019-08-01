<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card
          v-card-title Общие данные
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="field.title"
                  label="Наименование:"
                  required
                  @input="$v.field.title.$touch()"
                  @blur="$v.field.title.$touch()"
                  :error-messages="titleErrors"
                )
                v-textarea(
                  v-model="field.defaultValue"
                  label="Значение по умолчанию:"
                  placeholder="Строка или JSON"
                  no-resize
                  required
                )
                v-textarea(
                  v-if="field.fieldType === 'migx'"
                  v-model="field.schema"
                  label="Схема:"
                  placeholder="Строка или JSON"
                  no-resize
                  required
                )
              v-card(v-if="adminAccess")
        v-card
          v-card-actions
            v-btn.ml-2(
              color="primary"
              @click="create"
              v-if="operationType === 'create'"
            ) Создать
            v-btn.ml-2(
              color="primary"
              @click="update"
              v-if="operationType === 'update'"
            ) Сохранить
            v-btn.ml-2(
              color="error"
              @click="isRemoveDialog = true"
              v-if="operationType === 'update'"
            ) Удалить

      v-flex.xs12.md5.pl-2
        v-card
          v-card-text
            v-text-field(
              v-model="field.slug"
              label="Псевдоним:"
              required
              @input="$v.field.slug.$touch()"
              @blur="$v.field.slug.$touch()"
              :error-messages="slugErrors"
            )
            v-select(
              :items="layouts"
              item-text="title"
              item-value="id"
              label="Шаблон:"
              v-model="field.layouts"
              :error-messages="layoutErrors"
              @blur="$v.field.layouts.$touch()"
              multiple
              required
            )
            v-select(
              :items="types"
              label="Тип поля:"
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
import accessMixin from "@/mixins/accessMixin";
import panelMixin from "@/mixins/panelMixin";
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "FieldView",

  mixins: [accessMixin, panelMixin, validationMixin],

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
      panelName: "panel-field-base-data",
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    layouts() {
      return this.$store.getters["layout/getAll"];
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
    await this.$store.dispatch("layout/fetchAll");
  },

  methods: {
    /**
     * @function create
     * @async
     * Функция для создания поля
     * вызывает action {@link store/field/create}
     * TODO: после удачного создания поля
     * делать редирект на само поле получая его
     * данные через {@link store/field/fetch} для
     * дальнейшего редактирования
     */
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("field/create", this.field);
      }
    },

    /**
     * @function update
     * @async
     * Функция обновления поля
     * вызывает action {@link store/field/update}
     */
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("field/update", this.field);
      }
    },

    /**
     * @function remove
     * @async
     * Удаление поля через
     * action {@link store/field/remove}
     */
    async remove() {
      await this.$store.dispatch("field/remove", this.field.id);
      this.$router.push("/fields");
    }
  }
};
</script>
