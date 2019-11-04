<template lang="pug">
  v-flex
    .body-2.mb-12.mt-2 {{d.component || "Компонент"}}
    v-layout
      v-flex
        v-card
          v-card-text
            v-text-field(
              v-model="name"
              :label="`${d.name}:`"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              :error-messages="slugErrors"
            )
            ace(
              v-model="content.code"
              @init="editorInit"
              lang="html"
              theme="monokai"
              width="100%"
              height="500"
            )
          v-card-actions
            v-btn.ml-2(
              @click="create"
              color="primary"
              v-if="operationType === 'create'"
            ) {{d.save || "Сохранить"}}
            v-btn.ml-2(
              @click="update"
              color="primary"
              v-if="operationType === 'update'"
            ) {{d.save || "Сохранить"}}
            v-btn(
              @click="remove"
              color="error"
              v-if="operationType === 'update'"
            ) {{d.delete || "Удалить"}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);
// import axios from "axios";
// import requestHandler from "@/core/plugins/requestDataHandler";

export default {
  name: "Chunk",

  mixins: [validationMixin],

  props: {
    component: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  validations: {
    name: { required, alpha, minLength: minLength(3) }
  },

  data() {
    return {
      operationType: this.$route.query.operationType || "create",
      name: ""
    };
  },

  computed: {
    content() {
      return this.$store.getters["ide/getComponent"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.name.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.name.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.saveContent();
        this.operationType = "update";
      }
    },

    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.saveContent();
      }
    },

    async remove() {
      await this.$store.dispatch("ide/removeComponent", {
        body: { name: this.name }
      });
      this.$router.push("/components");
    },

    async saveContent() {
      await this.$store.dispatch("ide/saveComponent", {
        body: {
          name: this.name,
          content: this.content.code
        }
      });
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("ide/clearComponent");
    next();
  }
};
</script>
