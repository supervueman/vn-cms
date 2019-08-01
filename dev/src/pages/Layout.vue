<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Шаблон: {{layout.title}}
    v-layout.wrap
      layout-view(
        :layout="layout"
        operationType="update"
      )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import panelMixin from "@/mixins/panelMixin";
import { validationMixin } from "vuelidate";

// Comnponents
import Fields from "@/components/Layout/Fields";
import LayoutView from "@/components/Layout/View";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "LayoutPage",

  components: {
    Fields,
    LayoutView
  },

  mixins: [accessMixin, panelMixin, validationMixin],

  validations: {
    layout: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      panelName: "panel-layout-base-data",
      menu: false,
      isRemoveDialog: false,
      tab: null
    };
  },

  computed: {
    layout() {
      return this.$store.getters["layout/get"];
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.layout.slug.$dirty) return errors;
      !this.$v.layout.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.layout.slug.alpha &&
        errors.push("Разрешены только английские символы");
      !this.$v.layout.slug.required && errors.push("Обязательное поле");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.layout.title.$dirty) return errors;
      !this.$v.layout.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов");
      !this.$v.layout.title.required && errors.push("Обязательное поле");
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/fetch");
  }
};
</script>
