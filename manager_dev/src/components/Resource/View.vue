<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card.mb-3
          v-card-text Общие данные
          v-card-text
            v-layout.wrap
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-text-field(
                      v-model="resource.title"
                      label="Наименование:"
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
                      label="Описание:"
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
                      label="Дата публикации:"
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
                      label="Псевдоним:"
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
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-select(
                      :items="layouts"
                      item-text="title"
                      return-object
                      label="Шаблон:"
                      :value="resource.layout"
                      @change="changeLayoutConfirm($event)"
                      v-on="on"
                      required
                    )
                  span layout
              v-flex.md12
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-checkbox(
                      v-model="resource.published"
                      label="Опубликовать"
                      color="primary"
                      v-on="on"
                    )
                  span published
    v-card
      v-card-text Контент
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
          v-if="operationType === 'create'"
        ) Создать
        v-btn.ml-2(
          color="primary"
          @click="update"
          v-if="operationType === 'update'"
        ) Сохранить
        v-btn.ml-2(
          color="error"
          @click="isRemoveDialog = true"
          v-if="operationType === 'update'"
        ) Удалить
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
          v-card-title.title Вы уверены что хотите сменить шаблон?
          v-card-actions
            v-btn.ml-2(color="primary" @click="changeLayout") Сменить
            v-btn(color="primary" @click="cancelLayout") Отмена
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";

// Components
import Resources from "@/components/Resource/Resources";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

// Query
import { queryLayouts } from "@/query/layout";

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
    const data = {
      query: queryLayouts()
    };
    await this.$store.dispatch("layout/findAll", data);
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.resource.layout = this.changeLayoutData;
        this.resource.layoutId = this.changeLayoutId;
        if (this.$route.query.level) {
          this.resource.level = Number(this.$route.query.level) + 1;
        } else {
          this.resource.level = 1;
        }

        this.resource.parentId = this.$route.query.parentId;
        await this.$store.dispatch("resource/create", this.resource);
      }
    },

    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("resource/update", {
          data: this.resource,
          filter: {
            filter: {
              include: [
                {
                  model: "$layout"
                }
              ]
            }
          }
        });
      }
    },

    async remove() {
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
      await this.$store.dispatch("resource/remove", this.resource.id);
    },

    changeLayoutConfirm(event) {
      this.changeLayoutId = event.id;
      this.changeLayoutData = event;
      if (this.operationType === "update") {
        this.isChangeLayout = true;
      }
    },

    async changeLayout() {
      this.resource.layout = this.changeLayoutData;
      this.resource.layoutId = this.changeLayoutId;
      for await (let el of this.$store.getters[
        "resource/getAdditionalFields"
      ]) {
        await this.$store.dispatch("additionalField/remove", el.id);
      }
      await this.update();
      await this.$store.dispatch("resource/findByPk", {
        id: this.$route.params.id,
        query: {
          filter: {
            include: [{ model: "$layout" }, { model: "$additionalfield" }]
          }
        }
      });
      this.isChangeLayout = false;
    },

    async cancelLayout() {
      await this.$store.dispatch("resource/findByPk", {
        id: this.$route.params.id,
        query: {
          filter: {
            include: [{ model: "$layout" }, { model: "$additionalfield" }]
          }
        }
      });
      this.isChangeLayout = false;
    }
  }
};
</script>
