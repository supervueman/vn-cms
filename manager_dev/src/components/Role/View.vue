<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md12
        v-card
          v-card-title Общие данные
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="role.slug"
                  label="Псевдоним:"
                  @input="$v.role.slug.$touch()"
                  @blur="$v.role.slug.$touch()"
                  :error-messages="slugErrors"
                )
                v-text-field(
                  v-model="role.title"
                  label="Наименование:"
                  @input="$v.role.title.$touch()"
                  @blur="$v.role.title.$touch()"
                  :error-messages="titleErrors"
                )

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
        :name="role.title"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "RoleView",

  mixins: [accessMixin, validationMixin],

  props: {
    operationType: {
      type: String,
      default: "create"
    },
    role: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  validations: {
    role: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    slugErrors() {
      const errors = [];
      if (!this.$v.role.slug.$dirty) return errors;
      !this.$v.role.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.role.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.role.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.role.title.$dirty) return errors;
      !this.$v.role.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.role.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("role/create", {
          body: this.role
        });
        this.$router.push(`/roles/${this.$store.getters["role/get"].id}`);
        this.$store.dispatch("role/clear");
      }
    },

    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("role/update", {
          body: this.role
        });
      }
    },

    async remove() {
      await this.$store.dispatch("role/remove", {
        body: {
          id: this.role.id
        }
      });
      this.$router.push("/roles");
    }
  }
};
</script>
