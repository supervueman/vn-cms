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
                      v-model="resource.title"
                      :label="`${d.name}:`"
                      v-on="on"
                      required
                      @input="$v.resource.title.$touch()"
                      @blur="$v.resource.title.$touch()"
                      :error-messages="titleErrors"
                    )
                  span title

              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-textarea(
                      v-model="resource.description"
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
                      v-model="resource.createdAt"
                      :label="`${d.date_creation}:`"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    )
                  v-date-picker(
                    v-model="resource.createdAt"
                    no-title
                    scrollable
                    color="primary"
                  )
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="resource.slug"
                      :label="`${d.slug}:`"
                      v-on="on"
                      @input="$v.resource.slug.$touch()"
                      @blur="$v.resource.slug.$touch()"
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
                  :value="resource.layout"
                  @change="changeLayoutConfirm($event)"
                  required
                )
              v-flex.md12
                v-select(
                  :items="types"
                  item-text="title"
                  return-object
                  :label="`${d.resource_type}:`"
                  :value="resource.resourcetype"
                  @change="changeType($event)"
                  required
                )
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-checkbox(
                      v-model="resource.published"
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
              :content="resource.content"
              @update="resource.content = $event()"
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
        :name="resource.title"
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
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";

// Components
import Resources from "@/components/Resource/Resources";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
import cyrillicToTranslit from "cyrillic-to-translit-js";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "ResourceView",

  mixins: [accessMixin, validationMixin],

  props: {
    resource: {
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
    resource: {
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
      if (!this.$v.resource.slug.$dirty) return errors;
      !this.$v.resource.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.resource.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.resource.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.resource.title.$dirty) return errors;
      !this.$v.resource.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.resource.title.required && errors.push("Обязательное поле!");
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
        this.resource.layout = this.changeLayoutData;
        this.resource.layoutId = this.changeLayoutId;
        if (this.$route.query.level) {
          this.resource.level = Number(this.$route.query.level) + 1;
        } else {
          this.resource.level = 1;
        }

        if (this.$route.query.lang) {
          this.resource.lang = this.$route.query.lang;
        } else {
          this.resource.lang = this.mainLang;
        }

        if (this.$route.query.translationId) {
          this.resource.translationId = Number(this.$route.query.translationId);
        }

        if (this.$route.query.parentId !== "") {
          this.resource.parentId = Number(this.$route.query.parentId);
        } else {
          this.resource.parentId = null;
        }

        await this.$store.dispatch("resource/create", {
          body: this.resource
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
        await this.$store.dispatch("resource/update", {
          body: this.resource,
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
      const resources = this.$store.getters["resource/getAll"].filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      const profileResources = this.$store.getters[
        "profile/getResources"
      ].filter(el => {
        if (el.id !== this.resource.id) {
          return el;
        }
      });
      this.$store.dispatch("profile/setResources", profileResources);
      this.$store.dispatch("resource/setAll", resources);
      await this.$store.dispatch("resource/remove", {
        body: { id: this.resource.id }
      });
    },

    translitSlug(event) {
      const translitSlug = cyrillicToTranslit({ preset: "uk" })
        .transform(this.resource.title, "-")
        .toLowerCase();
      if (this.resource.slug === "") {
        this.resource.slug = translitSlug;
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
      this.resource.layout = this.changeLayoutData;
      this.resource.layoutId = this.changeLayoutId;
      for await (let el of this.$store.getters[
        "resource/getAdditionalFields"
      ]) {
        await this.$store.dispatch("additionalfield/remove", {
          body: { id: el.id }
        });
      }
      await this.update();
      await this.$store.dispatch("resource/findByPk", {
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
              "type"
            ]
          }
        }
      });
      this.isChangeLayout = false;
    },

    changeType(event) {
      this.resource.resourctype = event;
      this.resource.resourcetypeId = event.id;
    },

    async cancelLayout() {
      await this.$store.dispatch("resource/findByPk", {
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
              "type"
            ]
          }
        }
      });
      this.isChangeLayout = false;
    }
  }
};
</script>
