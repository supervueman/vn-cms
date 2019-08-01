<template lang="pug">
  v-flex
    v-layout.wrap
      v-flex.xs12.md7.pr-2
        v-card.mb-3
          v-card-title Общие данные
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
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="resource.createdAt"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
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
                      v-model="resource.layout"
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
      v-card-title Контент
      v-card-text
        v-layout.wrap
          v-flex.md12
            editor(
              v-if="resource.content !== undefined"
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
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";

// Components
import Resources from "@/components/Resource/Resources";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

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
      isRemoveDialog: false
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
    await this.$store.dispatch("layout/fetchAll");
  },

  methods: {
    create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$store.dispatch("resource/create", this.resource);
      }
    },
    update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$store.dispatch("resource/update", this.resource);
      }
    },
    remove() {
      this.$store.dispatch("resource/remove", this.resource.id);
      this.$router.push("/");
    }
  }
};
</script>
