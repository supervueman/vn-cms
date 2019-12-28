<template lang="pug">
	v-card(outlined)
		v-card-text
			v-select(
				:items="fieldCategories"
				item-text="title"
				item-value="id"
				:label="`${d.field_category || 'Категория полей'}:`"
				v-model="field.categoryId"
			)
			v-select(
				:items="layouts"
				item-text="title"
				item-value="id"
				:label="`${d.layout || 'Шаблон'}:`"
				v-model="field.layouts"
				multiple
			)
</template>

<script>
export default {
  name: "FieldSecondaryData",

  computed: {
    field() {
      return this.$store.getters["field/get"];
    },
    layouts() {
      return this.$store.getters["layout/getAll"];
    },
    fieldCategories() {
      return this.$store.getters["fieldcategory/getAll"];
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
    await this.$store.dispatch("fieldcategory/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  }
};
</script>
