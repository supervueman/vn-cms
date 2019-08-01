<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Дополнительное поле: {{field.title}}
    field-view(
      :field="field"
      operationType="update"
    )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import FieldView from "@/components/Field/View";
export default {
  name: "FieldPage",

  components: {
    FieldView
  },

  mixins: [accessMixin],

  data() {
    return {
      menu: false,
      isRemoveDialog: false
    };
  },

  computed: {
    field() {
      return this.$store.getters["field/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("field/fetch");
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.$store.dispatch("field/update", this.field);
      }
    },
    async remove() {
      await this.$store.dispatch("field/remove", this.field.id);
    }
  }
};
</script>
