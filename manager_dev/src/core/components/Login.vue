<template>
  <v-card
    class="mx-auto"
    tag="form"
  >
    <v-card-title>
      <h1 class="title">
        {{ d.login || 'Login' }}
      </h1>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="email"
        label="E-mail:"
        :error-messages="emailErrors"
        required
        autocomplete="username email"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        @click.once="getCredentials"
      />
      <v-text-field
        v-model="password"
        :label="`${d.password || 'Password'}:`"
        :error-messages="passErrors"
        type="password"
        required
        autocomplete="password"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      />
    </v-card-text>

    <v-card-actions>
      <router-link
        class="ml-2"
        to="/reset-password"
      >
        {{ d.forgot_password || 'Forgot your password?' }}
      </router-link>
      <v-btn
        class="ml-auto mr-2 mb-2"
        color="primary"
        depressed
        @click="submit"
      >
        {{ d.login || 'Login' }}
      </v-btn>
    </v-card-actions>
  </v-card>
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
        errors.push(`${this.d.email_is_not_valid || "E-mail is not valid"}`);
      !this.$v.email.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  mounted() {
    const self = this;
    const form = document.getElementById("form");

    document.onkeypress = event => {
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

      const bool = await this.$store.dispatch(
        "authenticate/loginByEmail",
        data
      );

      if (bool) {
        await this.$store.dispatch("profile/findByAccessToken");

        const profile = this.$store.getters["profile/get"];
        if (!profile.verified) {
          this.$router.push("/profile/verified");
        }

        const credentials = await this.createCredentials({
          id: this.email,
          name: `${profile.lastname || ""} ${profile.firstname || ""}`,
          iconURL: `${process.env.VUE_APP_API_BASE_URL}/${profile.image}`,
          password: this.password
        });

        await this.saveCredentials(credentials);

        this.email = "";
        this.password = "";

        this.$emit("closeLoginDialog");
      }
    },

    async createCredentials(credentials) {
      if (window.PasswordCredential) {
        const createdCredentials = await navigator.credentials.create({
          password: credentials
        });

        return createdCredentials;
      }
    },

    async saveCredentials(Credential) {
      if (window.PasswordCredential) {
        const credentials = await navigator.credentials.store(Credential);
      }
    },

    async getCredentials() {
      if (window.PasswordCredential) {
        const credentials = await navigator.credentials.get({
          password: true
        });

        if (credentials) {
          (this.email = credentials.id), (this.password = credentials.password);
        }
      }
    }
  }
};
</script>
