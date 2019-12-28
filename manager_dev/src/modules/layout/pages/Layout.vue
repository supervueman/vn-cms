<template lang="pug">
  v-flex(v-if="r.is_layout_read")
    .body-2.mb-12.mt-2 {{d.layout || 'Шаблон'}}: {{layout.title}} ({{layout.id}})
    v-layout.wrap
      v-flex
        v-card(outlined)
          v-card-text {{d.common_data || 'Общие данные'}}
          v-card-text
            v-flex.md12
              v-text-field(
                v-model="layout.slug"
                :label="`${d.slug || 'Псевдоним'}:`"
                required
                @input="$v.layout.slug.$touch()"
                @blur="$v.layout.slug.$touch()"
                :error-messages="slugErrors"
              )
              v-text-field(
                v-model="layout.title"
                :label="`${d.name || 'Наименование'}:`"
                required
                @input="$v.layout.title.$touch()"
                @blur="$v.layout.title.$touch()"
                :error-messages="titleErrors"
              )
          v-card-actions
            v-btn.ml-2.mb-2(
              depressed
              color="primary"
              @click="update"
              v-if="r.is_layout_create"
            ) {{d.save || 'Сохранить'}}

    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="layout.title"
      )

    .d-flex.justify-center.mt-3
      v-btn(
        text
        color="error"
        depressed
        @click="isRemoveDialog = true"
      ) {{d.remove || 'Удалить'}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "LayoutPage",

  mixins: [validationMixin],

  metaInfo() {
    return {
      title: `${this.d.layout || "Шаблон"}: ${this.layout.title}`
    };
  },

  validations: {
    layout: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data: () => ({
    isRemoveDialog: false
  }),

  computed: {
    layout() {
      return this.$store.getters["layout/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.layout.slug.$dirty) return errors;
      !this.$v.layout.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.layout.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.layout.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.layout.title.$dirty) return errors;
      !this.$v.layout.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.layout.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/findByPk", {
      params: { id: this.$route.params.id }
    });
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (this.r.is_layout_update && !this.$v.$error) {
        await this.$store.dispatch("layout/update", {
          body: this.layout,
          params: { id: this.layout.id }
        });
      }
    },

    async remove() {
      if (this.r.is_layout_delete) {
        const bool = await this.$store.dispatch("layout/remove", {
          params: { id: this.layout.id }
        });
        if (bool) {
          this.$router.push("/layouts");
        }
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("layout/clear");
    next();
  }
};
</script>
