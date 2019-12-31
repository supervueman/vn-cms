<template lang="pug">
  v-card
    v-card-title {{d.directory || 'Directory'}}: {{folderName}}
    v-card-text
      v-text-field(
        v-model="folderName"
        :label="`${d.enter_dir_name || 'Enter directory name'}`"
        :error-messages="folderNameErrors"
        @input="$v.folderName.$touch()"
        @blur="$v.folderName.$touch()"
      )
    v-card-actions.px-4.pb-4
      v-btn(@click="createFolder" color="primary" depressed) {{d.create || 'Create'}}
      v-btn(@click="cancel" depressed) {{d.cancel || 'Cancel'}}
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  name: "CreateFolder",

  mixins: [validationMixin],

  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },

  validations: {
    folderName: { required, minLength: minLength(3) }
  },

  data() {
    return {
      folderName: ""
    };
  },

  computed: {
    folderNameErrors() {
      const errors = [];
      if (!this.$v.folderName.$dirty) return errors;
      !this.$v.folderName.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.folderName.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    createFolder() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      this.$emit("createFolder", this.folderName);
      this.folderName = "";
    },
    cancel() {
      this.folderName = "";
      this.$emit("update:isActive", false);
    }
  }
};
</script>
