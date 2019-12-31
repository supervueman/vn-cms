<template lang="pug">
  v-flex(v-if="r.is_role_create")
    .body-2.mb-12.mt-2 {{d.role_creation || 'Создание роли'}}
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
            :disabled="role.slug === 'admin'"
          )
          v-text-field(
            v-model="role.title"
            :label="`${d.name || 'Наименование'}:`"
            @input="$v.role.title.$touch()"
            @blur="$v.role.title.$touch()"
            :error-messages="titleErrors"
          )
          v-text-field(
            v-model="role.rang"
            :label="`${d.rang || 'Ранг'}:`"
            type="number"
          )
      v-list
        v-list-item(v-for="(rule, i) in role.rules" :key="i")
          v-list-item-content {{rule.title}}
          v-list-item-action
            v-checkbox(
              v-model="rule.value"
              :disabled="role.slug === 'admin'"
              )
      v-card-actions
        v-btn.ml-2.mb-2(
          depressed
          color="primary"
          @click="create"
          v-if="r.is_role_create"
        ) {{d.create || 'Создать'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "RoleCreatePage",

  mixins: [validationMixin],

  validations: {
    role: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  metaInfo() {
    return {
      title: `${this.d.role_create || "Создание роли"}`
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
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "Поле должено быть не менее 3 символов"}`
        );
      !this.$v.role.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Разрешены только английские символы"}`
        );
      !this.$v.role.slug.required &&
        errors.push(`${this.d.required_field || "Обязательное поле"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.role.title.$dirty) return errors;
      !this.$v.role.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "Поле должено быть не менее 3 символов"}`
        );
      !this.$v.role.title.required &&
        errors.push(`${this.d.required_field || "Обязательное поле"}`);
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findDefault");
    await this.$store.dispatch("role/clear");
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (this.r.is_role_create && !this.$v.$error) {
        // Сохраняем только те правила у которых проставлены галочки
        const rules = {};
        for (const key in this.role.rules) {
          if (this.role.rules[key].value) {
            rules[key] = this.role.rules[key];
          }
        }
        this.role.rang = Number(this.role.rang);
        const bool = await this.$store.dispatch("role/create", {
          body: {
            ...this.role,
            rules: JSON.stringify(rules)
          }
        });
        this.$router.push(`/roles/${this.$store.getters["role/get"].id}`);

        if (bool) {
          this.$store.dispatch("role/clear");
        }
      }
    }
  }
};
</script>
