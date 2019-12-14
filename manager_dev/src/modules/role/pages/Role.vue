<template lang="pug">
  v-flex(v-if="r.is_role_read")
    .body-2.mb-12.mt-2 {{d.role || 'Роль'}}: {{role.slug}} ({{role.id}})
    v-card(outlined)
      v-card-text {{d.common_data || 'Общие данные'}}
      v-card-text
        v-flex.md12
          v-text-field(
            v-model="role.slug"
            :label="`${d.slug || 'Псевдоним'}:`"
            @input="$v.role.slug.$touch()"
            @blur="$v.role.slug.$touch()"
            :error-messages="slugErrors"
            :disabled="role.slug === 'admin' || role.slug === 'default'"
          )
          v-text-field(
            v-model="role.title"
            :label="`${d.name || 'Наименование'}:`"
            @input="$v.role.title.$touch()"
            @blur="$v.role.title.$touch()"
            :error-messages="titleErrors"
            :disabled="role.slug === 'admin' || role.slug === 'default'"
          )
          v-text-field(
            v-model="role.rang"
            :label="`${d.rang || 'Ранг'}:`"
            type="number"
            :disabled="role.slug === 'admin' || role.slug === 'default'"
          )
      v-list
        v-list-item(v-for="(rule, i) in role.rules" :key="i")
          v-list-item-content {{rule.title}}
          v-list-item-action
            v-checkbox(
              v-model="rule.value"
              :disabled="role.slug === 'admin' || role.slug === 'default'"
              )
      v-card-actions
        v-btn.ml-2(
          depressed
          color="primary"
          @click="update"
          v-if="r.is_role_create"
        ) {{d.save || 'Сохранить'}}
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="role.title"
      )
    .d-flex.justify-center.mt-3
      v-btn(
        text
        color="error"
        depressed
        @click="isRemoveDialog = true"
      ) {{d.remove || 'Удалить'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "RolePage",

  metaInfo() {
    return {
      title: `${this.d.role || "Role"}: ${this.role.title}`
    };
  },

  mixins: [validationMixin],

  validations: {
    role: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data: () => {
    return {
      isRemoveDialog: false
    };
  },

  computed: {
    role() {
      return this.$store.getters["role/get"];
    },
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

  async mounted() {
    await this.$store.dispatch("role/findDefault");
    await this.$store.dispatch("role/findByPk", {
      params: {
        id: this.$route.params.id
      }
    });
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (this.r.is_role_update && !this.$v.$error) {
        // Сохраняем только те правила у которых проставлены галочки
        const rules = {};
        for (const key in this.role.rules) {
          if (this.role.rules[key].value) {
            rules[key] = this.role.rules[key];
          }
        }

        await this.$store.dispatch("role/update", {
          body: {
            ...this.role,
            rules: JSON.stringify(rules)
          }
        });
      }
    },

    async remove() {
      if (this.r.is_role_delete) {
        await this.$store.dispatch("role/remove", {
          body: {
            id: this.role.id
          }
        });
        this.$router.push("/roles");
      }
    }
  }
};
</script>
