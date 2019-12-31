<template lang="pug">
	v-toolbar(flat color="white")
		v-spacer
		v-btn.mr-2(
			depressed
			color="primary"
			v-if="r.is_dictionary_update && dictionariesLength > 0"
			@click="$emit('update')"
		) {{d.save || 'Save'}}
		v-btn(
			depressed
			color="primary"
			@click="$emit('openCreateDialog', false); isDictionaryCreate = true"
			v-if="r.is_dictionary_create"
		) {{d.create_dictionary || 'Create dictionary'}}
</template>

<script>
/**
 * @Emit @event update and @event openCreateDialog
 */

export default {
  name: "DictionariesToolbar",

  props: {
    dictionariesLength: {
      type: Number,
      default: 0
    }
  }
};
</script>
