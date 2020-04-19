<template lang="pug">
  v-card.mx-auto(
    tag="form"
    max-width="500px"
    flat
  )
    v-card-title
      h1.title {{d.verified_account || 'Verified account'}}
    v-card-text
      v-text-field(
        v-model="email"
        label="E-mail:"
        :error-messages="emailErrors"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        v-if="!$route.query.token"
      )
    v-card-actions
      v-btn.ml-auto.mr-2.mb-2(
        @click="request"
        color="primary"
        v-if="!$route.query.token"
        depressed
      ) {{d.send_request || 'Send request'}}
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "VerifiedAccount",

  metaInfo() {
    return {
      title: `${this.d.verified_account || "Verified account"}`
    };
  },

  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },

  data() {
    return {
      email: ""
    };
  },

  computed: {
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

  async mounted() {
    if (this.$route.query.token) {
      await this.$store.dispatch("profile/verifiedAccountByEmail", {
        headers: {
          "x-verified-token": this.$route.query.token
        }
      });
    }
  },

  methods: {
    async request() {
      this.$v.$touch();
      if (this.$v.email.$error) {
        return;
      }

      const data = {
        email: this.email
      };

      await this.$store.dispatch("profile/verifiedAccountByEmailRequest", {
        body: data
      });

      this.email = "";
    }
  }
};
</script>
