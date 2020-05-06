<template lang="pug">
	v-flex(v-if="r.is_dictionary_read")
		.body-2.mb-12.mt-2 {{d.dictionaries || 'Dictionaries'}}
		v-flex
			langs-list
			lexicons-list
</template>

<script>
// Components
import LangsList from "../../lang/components/LangsList";
import LexiconsList from "../../lexicon/components/LexiconsList";

export default {
  name: "DictionariesPage",

  components: {
    LangsList,
    LexiconsList
  },

  metaInfo() {
    return {
      title: `${this.d.dictionaries || "Dictionaries"}`
    };
  },

  async mounted() {
    await this.$store.dispatch("lang/findAll");
  }
};
</script>
