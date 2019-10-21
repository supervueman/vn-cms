<template lang="pug">
  v-layout(v-if="r.is_resource_create")
    v-flex
      v-layout.wrap.pt-4
        v-flex.xs12.md7.pr-2
          v-expansion-panel(v-model="panel" expand)
            v-expansion-panel-content
              template.px-2(v-slot:header)
                div {{d.common_data}}
              v-card.mb-3
                v-card-title {{d.common_data}}
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
                  v-tooltip(top)
                    template(v-slot:activator="{ on }")
                      v-select(
                        :items="[{id: '1' ,slug: 'base', title: 'Базовый шаблон'}, {id: '2', slug: 'custom', title: 'Кастомный шаблон'}]"
                        item-text="title"
                        return-object
                        :label="`${d.layout}:`"
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
                        :label="d.published"
                        color="primary"
                        v-on="on"
                      )
                    span published
      v-expansion-panel(v-model="panelDescription" expand)
        v-expansion-panel-content
          template.px-2(v-slot:header)
            div {{d.content}}
          v-card.mb-3
            v-card-text
              v-layout.wrap
                v-flex.md12
                  Editor(
                    v-if="resource.content !== undefined"
                    :content="resource.content"
                    @update="resource.content = $event()"
                  )
      v-card
        v-card-actions
          v-btn.ml-2(
            color="primary"
            v-if="r.is_resource_create"
            @click="create"
          ) {{d.create}}
          v-btn.ml-2(
            @click="$emit('close')"
            v-if="resource.parentId !== '' && resource.parentId !== undefined"
          ) {{d.cancel}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";

// Components
import Resources from "@/components/Resource/Resources";
// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "ResourceCreate",

  mixins: [validationMixin],

  validations: {
    resource: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      panelDescription: [true],
      panelName: "panel-resource-create",
      menu: false
    };
  },

  computed: {
    resource() {
      return this.$store.getters["resource/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.resource.slug.$dirty) return errors;
      !this.$v.resource.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.resource.slug.alpha &&
        errors.push("Разрешены только английские символы");
      !this.$v.resource.slug.required && errors.push("Обязательное поле");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.resource.title.$dirty) return errors;
      !this.$v.resource.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.resource.title.required && errors.push("Обязательное поле");
      return errors;
    }
  },

  methods: {
    create() {
      if (!this.r.is_resource_create) {
        return;
      }
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$store.dispatch("resource/createResource", this.resource);
      }
    }
  }
};
</script>
