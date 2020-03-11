<template lang="pug">
  v-card.mb-3(outlined)
    //- Common data
    v-card-text.pb-0 {{d.common_data || 'Common data'}}
    v-card-text
      v-layout.wrap
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.lastname"
            :label="`${d.lastname || 'Latname'}:`"
          )
        v-flex.md6
          v-text-field(
            v-model="profile.firstname"
            :label="`${d.firstname || 'Firstname'}:`"
          )
        v-flex.md6.pr-3
          v-text-field(
            v-model="profile.middlename"
            :label="`${d.middlename || 'Middlename'}:`"
          )
        v-flex.md6
          v-text-field(
            v-model="profile.slug"
            :label="`${d.slug || 'Slug'}:`"
            @input="$v.profile.slug.$touch()"
            @blur="$v.profile.slug.$touch()"
            :error-messages="slugErrors"
          )
    v-card-actions.px-4.pb-4.pt-0
      v-btn(
        @click="update"
        color="primary"
        depressed
      ) {{d.save || 'Save'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";
// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "ProfileCommonData",

  mixins: [validationMixin],

  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },

  validations: {
    profile: {
      slug: { required, alpha, minLength: minLength(3) }
    }
  },

  computed: {
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
    }
  },

  methods: {
    async update() {
      if (this.r.is_user_update) {
        this.$v.profile.$touch();
        const data = {
          params: {
            id: this.profile.id,
          },
          body: {
            slug: this.profile.slug,
            firstname: this.profile.firstname,
            lastname: this.profile.lastname,
            middlename: this.profile.middlename
          },
          query: {
            filter: {
              include: ["role", "context"]
            }
          }
        };
        if (!this.$v.profile.$error) {
          await this.$store.dispatch("user/update", data);
        }
      }
    }
  }
};
</script>
