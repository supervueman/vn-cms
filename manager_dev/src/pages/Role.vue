<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-12.mt-2 Политика доступа: {{role.title}}
    v-layout.wrap
      role-view(
        :role="role"
        operationType="update"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import panelMixin from "@/mixins/panelMixin";
import { validationMixin } from "vuelidate";

// Comnponents
import RoleView from "@/components/Role/View";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "RolePage",

  components: {
    RoleView
  },

  mixins: [accessMixin, panelMixin, validationMixin],

  validations: {
    role: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  computed: {
    role() {
      return this.$store.getters["role/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.role.slug.$dirty) return errors;
      !this.$v.role.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.role.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.role.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.role.title.$dirty) return errors;
      !this.$v.role.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.role.title.required && errors.push("Обязательное поле!");
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findByPk", {
      params: {
        id: this.$route.params.id
      }
    });
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("role/clear");
    next();
  }
};
</script>
