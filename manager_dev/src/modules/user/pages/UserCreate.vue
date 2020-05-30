<template lang="pug">
  v-flex(v-if="r.is_user_create")
    .body-2.mb-12.mt-2 {{d.user_creation || 'User creation'}}
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card.mb-3(outlined)
          v-card-text.pb-0 {{d.common_data || 'Common data'}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-text-field(
                  v-model="profile.slug"
                  :label="`${d.slug || 'Slug'}:`"
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
                  :items="contexts"
                  item-text="title"
                  item-value="id"
                  v-model="profile.contextId"
                  :label="`${d.context || 'Context'}:`"
                )
              v-flex.md12
                v-text-field(
                  v-model="profile.password"
                  :label="`${d.enter_password || 'Enter password'}:`"
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
                  :label="`${d.confirm_password || 'Confirm password'}:`"
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
            ) {{d.create || 'Create'}}
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
      title: `${this.d.user_creation || "User creation"}`
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
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.profile.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.profile.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },

    passwordErrors() {
      const errors = [];
      if (!this.$v.profile.password.$dirty) return errors;
      !this.$v.profile.password.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      !this.$v.profile.password.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_six_sumbols ||
            "The field must be at least 6 characters"}`
        );
      return errors;
    },

    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.profile.confirmPassword.$dirty) return errors;
      !this.$v.profile.confirmPassword.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      !this.$v.profile.confirmPassword.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_six_sumbols ||
            "The field must be at least 6 characters"}`
        );
      !this.$v.profile.confirmPassword.sameAsPassword &&
        errors.push(
          `${this.d.password_not_confirm || "Passwords do not match"}`
        );
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.profile.email.$dirty) return errors;
      !this.$v.profile.email.email &&
        errors.push(
          `${this.d.email_is_not_valid || "E-mail не E-mail is not valid"}`
        );
      !this.$v.profile.email.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
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
          const data = {
            newEmail: this.profile.email,
            currentEmail: this.profile.email
          };

          await this.$store.dispatch("profile/verifiedAccountByEmailRequest", {
            body: data
          });
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
