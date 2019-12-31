<template lang="pug">
	v-toolbar(flat color="white")
		v-spacer
		v-flex.md4.mr-4
			v-select(
				:items="fieldCategories"
				item-text="title"
				item-value="id"
				hide-details
				:value="Number($route.query.categoryId)"
				clearable
				:label="`${d.field_categories || 'Категории полей'}:`"
				@change="$emit('filter', $event)"
			)
		v-btn(
			color="primary"
			to="/field-create"
			dark
			depressed
			v-if="r.is_field_create"
		) {{d.create_field || 'Создать поле'}}
</template>

<script>
export default {
  name: "FieldsToolbar",

  computed: {
    fieldCategories() {
      return this.$store.getters["fieldcategory/getAll"];
    }
  },

  async mounted() {
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
