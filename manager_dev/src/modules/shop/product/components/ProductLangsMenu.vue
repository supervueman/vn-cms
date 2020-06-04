<template lang="pug">
	div
		v-menu(offset-y)
			template(v-slot:activator="{ on }")
				v-btn(
					depressed
					v-on="on"
				)
					v-img(
						:src="`/images/flags/${product.lang || mainLang}.svg`"
						width="30"
					)
			v-list
				v-list-item(
					v-for="product in translations"
					:key="product.lang"
					:to="`/shop/products/${product.id}`"
				)
					v-img.mr-2(:src="`/images/flags/${product.lang || mainLang}.svg`" width="30")
					v-list-item-title {{product.lang}}
		v-btn(
			color="primary"
			depressed
			@click="isTranslationDialog = true"
			v-if="mainLang === product.lang && r.is_product_create"
		) {{d.create_translation || 'Create translation'}}

		v-dialog(
			v-model="isTranslationDialog"
			max-width="500px"
		)
			v-card(outlined)
				v-card-title.title {{d.select_lang || 'Select lang'}}
				v-card-text
					v-select(
						:items="langs"
						v-model="translationLang"
						@change="findTranslationParentId"
						@input="$v.translationLang.$touch()"
						@blur="$v.translationLang.$touch()"
						:error-messages="translationLangErrors"
					)
				v-card-actions.px-4.pb-4
					v-btn(
						color="primary"
						depressed
						@click="locateToTranslationCreate"
					) {{d.next_step || 'Next step'}}
					v-btn(
						color="primary"
						depressed
						@click="isTranslationDialog = false"
					) {{d.cancel || 'Cancel'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required } from "vuelidate/lib/validators";

export default {
  name: "ProductLangsMenu",

  mixins: [validationMixin],

  validations: {
    translationLang: { required }
  },

  data: () => ({
    isTranslationDialog: false,
    translationLang: "",
    translationParentId: null
  }),

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    },

    translations() {
      return this.$store.getters["shop/product/getTranslations"];
    },

    langs() {
      const dictionary = this.$store.getters["lang/getAll"]
        .map(el => el.slug)
        .sort();

      let existLangs = [];

      if (this.translations && this.translations.length > 0) {
        existLangs = this.translations.map(el => el.lang).sort();
      }

      function notExistLangs() {
        dictionary.forEach((el1, i) => {
          existLangs.forEach((el2, j) => {
            if (el1 === el2) {
              dictionary.splice(i, 1);
              notExistLangs();
              return;
            }
          });
        });
      }

      notExistLangs();

      return dictionary;
    },

    translationLangErrors() {
      const errors = [];
      if (!this.$v.translationLang.$dirty) return errors;
      !this.$v.translationLang.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    findTranslationParentId() {
      if (this.product.parent !== null && this.product.parent.translations) {
        this.translationParentId = null;
        this.product.parent.translations.forEach(el => {
          if (el.lang === this.translationLang) {
            this.translationParentId = el.id;
          }
        });
      }
    },

    locateToTranslationCreate() {
      this.$v.$touch();
      if (this.r.is_product_create && !this.$v.$error) {
        if (this.product.level - 1 > 0 && this.translationParentId === null) {
          this.$store.dispatch("notification/fetch", {
            type: "error",
            message: `${this.d.need_product_with_analog_lang ||
              "You must create a parent product with the same translation language"}`,
            isActive: true
          });
          return;
        }

        this.$router.push(
          `/shop/product-create?translationId=${this.product.id}&lang=${this.translationLang}&level=${this.product.level}&parentId=${this.translationParentId}&contextId=${this.product.contextId}`
        );
      }
    }
  }
};
</script>
