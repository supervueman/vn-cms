<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card.mb-3
          v-card-text {{d.common_data}}
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="product.title"
                      :label="`${d.name}:`"
                      v-on="on"
                      required
                      @input="$v.product.title.$touch()"
                      @blur="$v.product.title.$touch()"
                      :error-messages="titleErrors"
                    )
                  span title

              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-textarea(
                      v-model="product.description"
                      :label="`${d.description}:`"
                      v-on="on"
                      no-resize
                    )
                  span description
      v-flex.xs12.md5.pl-2
        v-card.mb-3
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-menu(
                  ref="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                )
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="product.createdAt"
                      :label="`${d.date_creation}:`"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    )
                  v-date-picker(
                    v-model="product.createdAt"
                    no-title
                    scrollable
                    color="primary"
                  )
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="product.slug"
                      :label="`${d.slug}:`"
                      v-on="on"
                      @input="$v.product.slug.$touch()"
                      @blur="$v.product.slug.$touch()"
                      :error-messages="slugErrors"
                      required
                    )
                  span slug
        v-card.mb-3
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-select(
                  :items="layouts"
                  item-text="title"
                  return-object
                  :label="`${d.layout}:`"
                  :value="product.layout"
                  @change="changeLayoutConfirm($event)"
                  required
                )
              v-flex.md12
                v-select(
                  :items="types"
                  item-text="title"
                  return-object
                  :label="`${d.resource_type}:`"
                  :value="product.resourcetype"
                  @change="changeType($event)"
                  required
                )
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-checkbox(
                      v-model="product.published"
                      :label="`${d.published}`"
                      color="primary"
                      v-on="on"
                    )
                  span published
    v-card
      v-card-text {{d.content}}
      v-card-text
        v-layout.wrap
          v-flex.md12
            editor(
              :content="product.content"
              @update="product.content = $event()"
            )
      v-card-actions
        v-btn.ml-2(
          color="primary"
          @click="create"
          v-if="r.is_resource_create && operationType === 'create'"
        ) {{d.create}}
        v-btn.ml-2(
          color="primary"
          @click="update"
          v-if="r.is_resource_update && operationType === 'update'"
        ) {{d.save}}
        v-btn.ml-2(
          color="error"
          @click="isRemoveDialog = true"
          v-if="r.is_resource_delete && operationType === 'update'"
        ) {{d.remove}}
    v-dialog(
        v-model="isRemoveDialog"
        max-width="500px"
      )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="product.title"
      )
    v-dialog(
        v-model="isChangeLayout"
        max-width="500px"
      )
      v-flex
        v-card
          v-card-title.title {{d.confirm_layout_change}}
          v-card-actions
            v-btn.ml-2(color="primary" @click="changeLayout") {{d.change}}
            v-btn(color="primary" @click="cancelLayout") {{d.cancel}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
import cyrillicToTranslit from "cyrillic-to-translit-js";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "ProductViewComponent",

  mixins: [validationMixin],

  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    },
    operationType: {
      type: String,
      default: "create"
    }
  },

  validations: {
    product: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      menu: false,
      isRemoveDialog: false,
      isChangeLayout: false,
      changeLayoutId: 0,
      changeLayoutData: {}
    };
  },

  computed: {
    layouts() {
      return this.$store.getters["layout/getAll"];
    },
    types() {
      return this.$store.getters["resource/getTypes"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.product.slug.$dirty) return errors;
      !this.$v.product.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.product.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.product.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.product.title.$dirty) return errors;
      !this.$v.product.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.product.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });

    await this.$store.dispatch("resource/findTypes");
  },

  methods: {
    async create() {
      if (!this.r.is_resource_create) {
        return;
      }
      this.translitSlug();
      this.$v.$touch();

      if (!this.$v.$error) {
        this.product.layout = this.changeLayoutData;
        this.product.layoutId = this.changeLayoutId;
        if (this.$route.query.level) {
          this.product.level = Number(this.$route.query.level) + 1;
        } else {
          this.product.level = 1;
        }

        if (this.$route.query.lang) {
          this.product.lang = this.$route.query.lang;
        } else {
          this.product.lang = this.mainLang;
        }

        if (this.$route.query.translationId) {
          this.product.translationId = Number(this.$route.query.translationId);
        }

        if (this.$route.query.parentId !== "") {
          this.product.parentId = Number(this.$route.query.parentId);
        } else {
          this.product.parentId = null;
        }

        await this.$store.dispatch("shop/product/create", {
          body: this.product
        });
      }
    },

    async update() {
      if (!this.r.is_resource_update) {
        return;
      }
      this.translitSlug();
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("shop/product/update", {
          body: this.product,
          query: {
            filter: {
              include: ["layout", "resourcetype"]
            }
          }
        });
      }
    },

    async remove() {
      if (!this.r.is_resource_delete) {
        return;
      }
      const products = this.$store.getters["shop/product/getAll"].filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      const profileResources = this.$store.getters[
        "profile/getResources"
      ].filter(el => {
        if (el.id !== this.product.id) {
          return el;
        }
      });
      this.$store.dispatch("profile/setResources", profileResources);
      this.$store.dispatch("shop/product/setAll", products);
      await this.$store.dispatch("shop/product/remove", {
        body: { id: this.product.id }
      });
    },

    translitSlug(event) {
      const translitSlug = cyrillicToTranslit({ preset: "uk" })
        .transform(this.product.title, "-")
        .toLowerCase();
      if (this.product.slug === "") {
        this.product.slug = translitSlug;
      }
    },

    changeLayoutConfirm(event) {
      if (!this.r.is_resource_update) {
        return;
      }
      this.changeLayoutId = event.id;
      this.changeLayoutData = event;
      if (this.operationType === "update") {
        this.isChangeLayout = true;
      }
    },

    async changeLayout() {
      if (!this.r.is_resource_update) {
        return;
      }
      this.product.layout = this.changeLayoutData;
      this.product.layoutId = this.changeLayoutId;
      for await (let el of this.$store.getters[
        "shop/product/getAdditionalFields"
      ]) {
        await this.$store.dispatch("shop/productfield/remove", {
          body: { id: el.id }
        });
      }
      await this.update();
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
              "productfields",
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
      this.isChangeLayout = false;
    },

    changeType(event) {
      this.product.resourctype = event;
      this.product.resourcetypeId = event.id;
    },

    async cancelLayout() {
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
      this.isChangeLayout = false;
    }
  }
};
</script>
