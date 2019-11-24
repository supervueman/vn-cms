<template lang="pug">
	v-layout(v-if="r.is_product_read")
		v-flex {{product}}
			v-layout
				.body-2.mb-12.mt-2 {{d.product}}: {{product.title}} 
				v-spacer
				v-menu(offset-y)
					template(v-slot:activator="{ on }")
						v-btn(
							text
							v-on="on"
						)
							v-img(
								:src="`/images/flags/${product.lang || 'ru'}.svg`"
								width="30"
							)
					v-list
						v-list-item(
							v-for="product in translations"
							:key="product.lang"
							:to="`/shop/products/${product.id}`"
						)
							v-img.mr-2(:src="`/images/flags/${product.lang || 'ru'}.svg`", alt="alt" width="30")
							v-list-item-title {{product.lang}}
				v-btn(
					color="primary"
					@click="isTranslationDialog = true"
					v-if="mainLang === product.lang && r.is_product_create && (profile.id === product.userId ||profile.userId === product.userId)"
				) {{d.create_translation}}
			v-tabs(
				v-model="tab"
				slider-color="primary"
				grow
			)
				v-tab {{d.common_data}}
				v-tab {{d.additional_fields}}
				v-tab {{d.resources}}
				v-tab-item
					v-layout.pt-4
						product-view(
							:product="product"
							operationType="update"
						)
				v-tab-item
					v-layout.wrap.pt-4
						v-flex
							fields(
								:product="product"
							)
				v-tab-item
					v-layout.wrap.pt-4
						v-flex
							v-card
								v-card-text
									products(
										:level="product.level"
										:parentId="product.id"
										:lang="product.lang"
										:userId="product.userId"
									)
		v-dialog(
			v-model="isTranslationDialog"
			max-width="500px"
		)
			v-flex
				v-card
					v-card-title.title {{d.change_lang}}
					v-card-text
						v-select(
							:items="langs"
							v-model="translationLang"
							@change="findTranslationParentId"
							@input="$v.translationLang.$touch()"
							@blur="$v.translationLang.$touch()"
							:error-messages="translationLangErrors"
						)
					v-card-actions
						v-btn.ml-2(
							color="primary"
							@click="locateToTranslationCreate"
						) {{d.next}}
						v-btn(
							color="primary"
							@click="isTranslationDialog = false"
						) {{d.cancel}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Libs
import { required } from "vuelidate/lib/validators";

// Components
import ProductView from "../components/View";
import Fields from "../components/Fields";
import Products from "../components/Products";

export default {
  name: "ProductPage",

  metaInfo() {
    return {
      title: `${this.d.product || "Product"}: ${this.product.title}`
    };
  },

  components: {
    ProductView,
    Products,
    Fields
  },

  mixins: [validationMixin],

  validations: {
    translationLang: { required }
  },

  data() {
    return {
      tab: null,
      isTranslationDialog: false,
      translationLang: "",
      translationParentId: ""
    };
  },

  computed: {
    product() {
      return this.$store.getters["shop/product/get"];
    },

    translations() {
      return this.$store.getters["shop/product/getTranslations"];
    },

    langs() {
      let dictionary = this.$store.getters["dictionary/getAll"]
        .map(el => el.lang)
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
      !this.$v.translationLang.required && errors.push("Обязательное поле!");
      return errors;
    },

    profile() {
      return this.$store.getters["profile/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("shop/product/findByPk", {
      params: {
        id: this.$route.params.id
      },
      query: {
        filter: {
          include: [
            {
              association: "layout",
              include: ["fields"]
            },
            "additionalfields",
            {
              association: "parent",
              include: ["translations"]
            },
            "translations",
            "resourcetype"
          ]
        }
      }
    });
  },

  methods: {
    findTranslationParentId() {
      if (
        this.product.parent !== null &&
        this.product.parent.translations &&
        this.product.parent.translations.length > 0
      ) {
        this.product.parent.translations.forEach(el => {
          if (el.lang === this.translationLang) {
            this.translationParentId = el.id;
          }
        });
      }
    },

    locateToTranslationCreate() {
      if (!this.r.is_product_create) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        if (
          this.product.level - 1 > 0 &&
          (this.translationParentId === "" ||
            this.translationParentId === null ||
            this.translationParentId === undefined)
        ) {
          this.$store.dispatch("notification/fetch", {
            type: "error",
            message:
              "Сначала нужно создать родительский ресурс с таким же языком!",
            isActive: true
          });
          return;
        }
        this.$router.push(
          `/shop/product-create?translationId=${this.product.id}&lang=${
            this.translationLang
          }&level=${this.product.level - 1}&parentId=${
            this.translationParentId
          }`
        );
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("shop/product/clear");
    next();
  },

  async beforeRouteUpdate(to, from, next) {
    await this.$store.dispatch("shop/product/findByPk", {
      params: {
        id: to.params.id
      },
      query: {
        filter: {
          include: [
            {
              association: "layout",
              include: ["fields"]
            },
            "additionalfields",
            {
              association: "parent",
              include: ["translations"]
            },
            "translations",
            "resourcetype"
          ]
        }
      }
    });
    next();
  }
};
</script>
