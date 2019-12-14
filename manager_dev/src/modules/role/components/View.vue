<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md12
        v-card
          v-card-text {{d.common_data}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="role.slug"
                  :label="`${d.slug}:`"
                  @input="$v.role.slug.$touch()"
                  @blur="$v.role.slug.$touch()"
                  :error-messages="slugErrors"
                  :disabled="role.slug === 'admin'"
                )
                v-text-field(
                  v-model="role.title"
                  :label="`${d.name}:`"
                  @input="$v.role.title.$touch()"
                  @blur="$v.role.title.$touch()"
                  :error-messages="titleErrors"
                )
              v-flex
                v-list
                  v-list-item(v-for="(rule, i) in role.rules" :key="i")
                    v-list-item-content {{rule.title}}
                    v-list-item-action
                      v-checkbox(
                        v-model="rule.value"
                        :disabled="role.slug === 'admin'"
                      )

    v-card
      v-card-actions
        v-btn.ml-2(
          color="primary"
          @click="create"
          v-if="r.is_role_create && operationType === 'create'"
        ) {{d.create}}
        v-btn.ml-2(
          color="primary"
          @click="update"
          v-if="r.is_role_update && operationType === 'update' && role.slug !== 'admin'"
        ) {{d.save}}
        v-btn.ml-2(
          color="error"
          @click="isRemoveDialog = true"
          v-if="r.is_role_delete && operationType === 'update' && role.slug !== 'manager' && role.slug !== 'admin'"
        ) {{d.remove}}

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
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "RoleView",

  mixins: [validationMixin],

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
      isRemoveDialog: false,
      headers: [
        {
          text: "Rule",
          align: "left",
          sortable: false
        },
        { text: "", value: "" }
      ]
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
        errors.push("Наименование должно быть не менее 3 символов!");
      !this.$v.role.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    async create() {
      if (!this.r.is_role_create) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("role/create", {
          body: {
            ...this.role,
            rules: JSON.stringify(this.role.rules)
          }
        });
        this.$router.push(`/roles/${this.$store.getters["role/get"].id}`);
        this.$store.dispatch("role/clear");
      }
    },

    async update() {
      if (!this.r.is_role_update) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("role/update", {
          body: {
            ...this.role,
            rules: JSON.stringify(this.role.rules)
          }
        });
      }
    },

    async remove() {
      if (!this.r.is_role_delete) {
        return;
      }
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
