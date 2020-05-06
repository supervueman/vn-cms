<template lang="pug">
	v-card.pt-4(outlined)
		v-card-text.px-4
			v-text-field(
				v-model="lang.slug"
				:label="`${d.slug || 'Slug'}:`"
				@input="$v.lang.slug.$touch()"
				@blur="$v.lang.slug.$touch()"
				:error-messages="slugErrors"
			)
			v-text-field(
				v-model="lang.title"
				:label="`${d.name || 'Name'}:`"
				@input="$v.lang.title.$touch()"
				@blur="$v.lang.title.$touch()"
				:error-messages="titleErrors"
			)
		v-card-actions.px-4.pb-4
			v-btn(
				@click="update"
				color="primary"
				depressed
				v-if="operationType === 'update' && r.is_lang_update"
			) {{d.save || 'Save'}}
			v-btn(
				@click="create"
				color="primary"
				depressed
				v-if="operationType === 'create' && r.is_lang_create"
			) {{d.create || 'Create'}}
			v-btn(
				@click="remove"
				color="error"
				depressed
				v-if="operationType === 'update' && r.is_lang_delete"
			) {{d.remove || 'Remove'}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "LangDialogComponent",

  mixins: [validationMixin],

  validations: {
    lang: {
      slug: { required, alpha },
      title: { required }
    }
  },

  props: {
    operationType: {
      type: String,
      default: "create"
    }
  },

  computed: {
    lang() {
      return this.$store.getters["lang/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.lang.slug.$dirty) return errors;
      !this.$v.lang.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.lang.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.lang.title.$dirty) return errors;
      !this.$v.lang.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();

      if (!this.$v.$error && this.r.is_lang_create) {
        await this.$store.dispatch("lang/create", {
          body: this.lang
        });
        this.$emit("create", this.lang);
        this.$store.dispatch("lang/clear");
      }
    },

    async update() {
      this.$v.$touch();
      if (!this.$v.$error && this.r.is_lang_update) {
        await this.$store.dispatch("lang/update", {
          params: {
            id: this.lang.id
          },
          body: this.lang
        });
        this.$emit("update", this.lang);
      }
    },

    async remove() {
      if (this.r.is_delivery_delete) {
        await this.$store.dispatch("lang/remove", {
          params: { id: this.lang.id }
        });

        const deliveries = this.$store.getters["lang/getAll"].filter(
          el => el.id !== this.lang.id
        );
        this.$store.dispatch("lang/setAll", deliveries);

        this.$store.dispatch("lang/clear");
        this.$emit("remove", this.lang);
      }
    }
  }
};
</script>
