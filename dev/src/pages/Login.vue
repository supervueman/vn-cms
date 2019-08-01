<template lang="pug">
  v-flex(class="mt-5")
    v-card(
      class="mx-auto"
      max-width="500"
      tag="form"
    )
      v-card-title
        h1(class="title") Войти
      v-card-text
        v-text-field(
          v-model="email"
          label="E-mail:"
          :error-messages="emailErrors"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        )
        v-text-field(
          v-model="password"
          label="Пароль:"
          :error-messages="passErrors"
          type="password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        )
      v-card-actions
        router-link(to="/reset-password" class="ml-2") Забыли пароль?
        v-btn(
          @click="submit"
          color="primary"
          class="ml-auto mr-2 mb-2"
        ) Войти
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Login",

  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(6) },
    email: { required, email }
  },

  data() {
    return {
      email: "",
      password: ""
    };
  },

  computed: {
    passErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Пароль должен быть не менее 6 символов");
      !this.$v.password.required && errors.push("Обязательное поле");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail не валиден");
      !this.$v.email.required && errors.push("Обязательное поле");
      return errors;
    }
  },

  mounted() {
    const self = this;
    const form = document.getElementById("form");

    document.onkeypress = function(event) {
      if (event.code === "Enter") {
        self.submit();
      }
    };
  },

  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      const data = {
        email: this.email,
        password: this.password
      };
      await this.$store.dispatch("authenticate/signin", data);

      this.$router.push("/profile");
    }
  }
};
</script>
