<template lang="pug">
	v-card.pt-4(outlined)
		v-card-text.px-4
			v-text-field(
				v-model="lexicon.slug"
				:label="`${d.slug || 'Slug'}:`"
				@input="$v.lexicon.slug.$touch()"
				@blur="$v.lexicon.slug.$touch()"
				:error-messages="slugErrors"
			)
			v-text-field(
				v-model="lexicon.value"
				:label="`${d.name || 'Name'}:`"
				@input="$v.lexicon.value.$touch()"
				@blur="$v.lexicon.value.$touch()"
				:error-messages="valueErrors"
			)
			v-select(
				v-model="lexicon.langId"
				:items="langs"
				item-text="title"
				item-value="id"
				:label="`${d.lang || 'Lang'}`"
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
  name: "LexiconDialogComponent",

  mixins: [validationMixin],

  validations: {
    lexicon: {
      slug: { required, alpha },
      value: { required }
    }
  },

  props: {
    operationType: {
      type: String,
      default: "create"
    }
  },

  computed: {
    lexicon() {
      return this.$store.getters["lexicon/get"];
    },
    langs() {
      return this.$store.getters["lang/getAll"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.lexicon.slug.$dirty) return errors;
      !this.$v.lexicon.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.lexicon.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    valueErrors() {
      const errors = [];
      if (!this.$v.lexicon.value.$dirty) return errors;
      !this.$v.lexicon.value.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();

      if (!this.$v.$error && this.r.is_lexicon_create) {
        await this.$store.dispatch("lexicon/create", {
          body: this.lexicon
        });
        this.$emit("create", this.lexicon);
        this.$store.dispatch("lexicon/clear");
      }
    },

    async update() {
      this.$v.$touch();
      if (!this.$v.$error && this.r.is_lexicon_update) {
        await this.$store.dispatch("lexicon/update", {
          params: {
            id: this.lexicon.id
          },
          body: this.lexicon
        });
        this.$emit("update", this.lexicon);
      }
    },

    async remove() {
      if (this.r.is_lexicon_delete) {
        await this.$store.dispatch("lexicon/remove", {
          params: { id: this.lexicon.id }
        });

        const lexicons = this.$store.getters["lexicon/getAll"].filter(
          el => el.id !== this.lexicon.id
        );
        this.$store.dispatch("lexicon/setAll", lexicons);

        this.$store.dispatch("lexicon/clear");
        this.$emit("remove", this.lexicon);
      }
    }
  }
};
</script>
