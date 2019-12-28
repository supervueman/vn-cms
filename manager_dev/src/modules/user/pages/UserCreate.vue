<template lang="pug">
  v-flex(v-if="r.is_user_create")
    .body-2.mb-12.mt-2 {{d.user_creation || 'Создание пользователя'}}
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card.mb-3(outlined)
          v-card-text.pb-0 {{d.common_data || 'Общие данные'}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="profile.slug"
                  :label="`${d.slug || 'Псевдоним'}:`"
                  @input="$v.profile.slug.$touch()"
                  @blur="$v.profile.slug.$touch()"
                  :error-messages="slugErrors"
                )
              v-flex.md12
                v-text-field(
                  v-model="profile.email"
                  :label="`${d.emial || 'E-mail'}:`"
                  @input="$v.profile.email.$touch()"
                  @blur="$v.profile.email.$touch()"
                  :error-messages="emailErrors"
                )
              v-flex.md12
                v-select(
                  :items="roles"
                  item-text="title"
                  item-value="id"
                  v-model="profile.roleId"
                  :label="`${d.role || 'Роль'}:`"
                )
              v-flex.md12
                v-select(
                  :items="contexts"
                  item-text="title"
                  item-value="id"
                  v-model="profile.contextId"
                  :label="`${d.context || 'Контекст'}:`"
                )
              v-flex.md12
                v-text-field(
                  v-model="profile.password"
                  :label="`${d.enter_password || 'Введите пароль'}:`"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword = !showPassword"
                  :error-messages="passwordErrors"
                  @input="$v.profile.password.$touch()"
                  @blur="$v.profile.password.$touch()"
                )
              v-flex.md12
                v-text-field(
                  v-model="profile.confirmPassword"
                  :label="`${d.confirm_password || 'Повторите пароль'}:`"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showConfirmPassword = !showConfirmPassword"
                  :error-messages="confirmPasswordErrors"
                  @input="$v.profile.confirmPassword.$touch()"
                  @blur="$v.profile.confirmPassword.$touch()"
                )
          v-card-actions
            v-btn.ml-2(
              depressed
              color="primary"
              @click="create"
            ) {{d.create || 'Создать'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";
// Libs
import {
  required,
  minLength,
  sameAs,
  helpers,
  email
} from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "UserCreatePage",

  mixins: [validationMixin],

  validations: {
    profile: {
      slug: { required, alpha, minLength: minLength(3) },
      password: {
        required,
        minLength: minLength(6)
      },
      email: { required, email },
      confirmPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password")
      }
    }
  },

  metaInfo() {
    return {
      title: `${this.d.profile_create || "Profile create"}`
    };
  },

  data: () => {
    return {
      showPassword: false,
      showConfirmPassword: false
    };
  },

  computed: {
    profile() {
      return this.$store.getters["user/get"];
    },

    roles() {
      return this.$store.getters["role/getAll"];
    },

    contexts() {
      return this.$store.getters["context/getAll"];
    },

    slugErrors() {
      const errors = [];
      if (!this.$v.profile.slug.$dirty) return errors;
      !this.$v.profile.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.profile.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.profile.slug.required && errors.push("Обязательное поле!");
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.profile.password.$dirty) return errors;
      !this.$v.profile.password.required && errors.push("Обязательное поле");
      !this.$v.profile.password.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      return errors;
    },

    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.profile.confirmPassword.$dirty) return errors;
      !this.$v.profile.confirmPassword.required &&
        errors.push("Обязательное поле");
      !this.$v.profile.confirmPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      !this.$v.profile.confirmPassword.sameAsPassword &&
        errors.push("Пароли не совпадают!");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.profile.email.$dirty) return errors;
      !this.$v.profile.email.email && errors.push("E-mail не валиден!");
      !this.$v.profile.email.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });

    await this.$store.dispatch("context/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (this.r.is_user_create && !this.$v.$error) {
        const bool = await this.$store.dispatch("profile/createByEmail", {
          body: {
            slug: this.profile.slug,
            email: this.profile.email,
            roleId: Number(this.profile.roleId),
            contextId: Number(this.profile.contextId),
            password: this.profile.password
          }
        });

        if (bool) {
          this.$router.push(`/users/${this.$store.getters["user/get"].id}`);
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("user/clear");
    next();
  }
};
</script>
