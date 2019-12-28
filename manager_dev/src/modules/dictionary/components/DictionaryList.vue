<template lang="pug">
	v-flex.px-2.dictionary--list-text
		v-flex
			v-text-field(
				:label="`${d.slug || 'Псевдоним'}`"
				v-model="createSlug"
				append-icon="add"
				@click:append="$emit('addItem', createSlug); addItem();"
				:disabled="!r.is_dictionary_update"
			)
		v-flex(
			v-for="(item, key) in dictionary.value"
			:key="key"
		)
			v-text-field(
				:value="key"
				:label="`${d.slug || 'Псевдоним'}`"
				append-icon="remove"
				@click:append="isRemoveItem = true; removeItemSlug = key"
				:disabled="!r.is_dictionary_update"
			)
		v-dialog(
			v-model="isRemoveItem"
			max-width="500px"
		)
			remove-confirm(
				@remove="removeItem(); $emit('removeItem', removeItemSlug)"
				:isActive.sync="isRemoveItem"
				:name="`${removeItemSlug}`"
			)
</template>

<script>
export default {
  name: "DictionaryList",

  data: () => ({
    createSlug: "",
    isRemoveItem: false,
    removeItemSlug: ""
  }),

  methods: {
    addItem() {
      if (this.r.is_dictionary_update) {
        this.dictionary.value[this.createSlug] = {
          text: ""
        };
        this.$store.dispatch("dictionary/set", this.dictionary);
        this.createSlug = "";
      }
    },

    removeItem() {
      if (this.r.is_dictionary_update) {
        delete this.dictionary.value[this.removeItemSlug];
        this.$store.dispatch("dictionary/set", this.dictionary);
      }
    }
  }
};
</script>
