<template lang="pug">
  v-card(
    class="mx-auto"
    tag="form"
  )
    v-card-title
      h1(class="title") {{d.login || 'Login'}}
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
        :label="`${d.password || 'Password'}:`"
        :error-messages="passErrors"
        type="password"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      )
    v-card-actions
      router-link(to="/reset-password" class="ml-2") {{d.forgot_password || 'Forgot your password?'}}
      v-btn(
        @click="submit"
        color="primary"
        class="ml-auto mr-2 mb-2"
      ) {{d.login || 'Login'}}
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
        errors.push(
          `${this.d.field_must_be_have_more_six_sumbols ||
            "The field must be at least 6 characters"}`
        );
      !this.$v.password.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push(`${this.d.email_is_not_valid || "E-mail не E-mail is not valid"}`);
      !this.$v.email.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
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

      await this.$store.dispatch("authenticate/loginByEmail", data);

      this.email = "";
      this.password = "";

      this.$emit("closeLoginDialog");
    }
  }
};
</script>
