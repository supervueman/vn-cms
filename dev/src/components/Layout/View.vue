<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex
        v-tabs(slot="extension" v-model="tab" grow)
          v-tabs-slider(color="primary")
          v-tab Общие данные
          v-tab Дополнительные поля
          v-tabs-items
            v-tab-item
              v-flex.xs12.md12.pt-4
                v-card
                  v-card-title Общие данные
                  v-card-text
                    v-layout.wrap
                      v-flex.md12
                        v-text-field(
                          v-model="layout.slug"
                          label="Псевдоним:"
                          required
                          @input="$v.layout.slug.$touch()"
                          @blur="$v.layout.slug.$touch()"
                          :error-messages="slugErrors"
                        )
                        v-text-field(
                          v-model="layout.title"
                          label="Наименование:"
                          required
                          @input="$v.layout.title.$touch()"
                          @blur="$v.layout.title.$touch()"
                          :error-messages="titleErrors"
                        )
            v-tab-item
              v-flex.pt-4
                v-card
                  fields
    v-card(v-if="adminAccess")
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
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";

// Comnponents
import Fields from "@/components/Layout/Fields";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "LayoutView",

  components: {
    Fields
  },

  mixins: [accessMixin, validationMixin],

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
    /**
     * @function create
     * @async
     * Функция для создания шаблона
     * вызывает action {@link store/layout/create}
     * TODO: после удачного создания шаблона
     * делать редирект на сам шаблон получая его
     * данные через {@link store/layout/fetch} для
     * дальнейшего редактирования
     */
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("layout/create", this.layout);
      }
    },

    /**
     * @function update
     * @async
     * Функция обновления шаблона
     * вызывает action {@link store/layout/update}
     */
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("layout/update", this.layout);
      }
    },

    /**
     * @function remove
     * @async
     * Удаление шаблона через
     * action {@link store/layout/remove}
     */
    async remove() {
      await this.$store.dispatch("layout/remove", this.layout.id);
      this.$router.push("/layouts");
    }
  }
};
</script>
