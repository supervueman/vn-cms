<template lang="pug">
  v-expansion-panel
    v-expansion-panel-content
      template.px-2(v-slot:header)
        div Изменить пароль
      v-card(tag="form")
        v-card-text
          v-layout.wrap
            v-flex.md6.pr-3
              v-text-field(
                v-model="oldPassword"
                label="Введите старый пароль:"
                :type="showOldPassword ? 'text' : 'password'"
                :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
                @click:append="showOldPassword = !showOldPassword"
                :error-messages="oldPasswordErrors"
                @input="$v.oldPassword.$touch()"
                @blur="$v.oldPassword.$touch()"
              )
            v-flex.md6
              v-text-field(
                v-model="newPassword"
                label="Введите новый пароль:"
                :type="showNewPassword ? 'text' : 'password'"
                :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                @click:append="showNewPassword = !showNewPassword"
                :error-messages="newPasswordErrors"
                @input="$v.newPassword.$touch()"
                @blur="$v.newPassword.$touch()"
              )
            v-flex.md6.pr-3
              v-text-field(
                v-model="confirmNewPassword"
                label="Повторите пароль:"
                :type="showConfirmNewPassword ? 'text' : 'password'"
                :append-icon="showConfirmNewPassword ? 'visibility' : 'visibility_off'"
                @click:append="showConfirmNewPassword = !showConfirmNewPassword"
                :error-messages="confirmNewPasswordErrors"
                @input="$v.confirmNewPassword.$touch()"
                @blur="$v.confirmNewPassword.$touch()"
              )
        v-card-actions
          v-btn.ml-2(color="primary" @click="changePassword") Изменить
          v-btn(color="primary" @click="clearPassword") Сбросить
</template>

<script>
import { validationMixin } from "vuelidate";
import { helpers, required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "PasswordChange",

  mixins: [validationMixin],

  validations: {
    oldPassword: {
      required,
      minLength: minLength(6)
    },
    newPassword: {
      required,
      minLength: minLength(6)
    },
    confirmNewPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("newPassword")
    }
  },

  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false
    };
  },

  computed: {
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.required && errors.push("Обязательное поле");
      !this.$v.oldPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("Обязательное поле");
      !this.$v.newPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      return errors;
    },
    confirmNewPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmNewPassword.$dirty) return errors;
      !this.$v.confirmNewPassword.required && errors.push("Обязательное поле");
      !this.$v.confirmNewPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      !this.$v.confirmNewPassword.sameAsPassword &&
        errors.push("Пароли не совпадают!");
      return errors;
    }
  },

  methods: {
    /**
     * @function
     * @async
     * @var {object} data {oldPassword, newPassword}
     * Функция вызывает action {@link store/profileOwner/changePassword}
     * после удачного сохранения поля очищаются через функцию {@link clearPassword}
     */
    async changePassword() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }

      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      };
      // await this.$store.dispatch("changePassword", data);

      this.clearPassword();
    },

    /**
     * @function clearPassword
     * Функция для сброса изменений
     */
    clearPassword() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
    }
  }
};
</script>
