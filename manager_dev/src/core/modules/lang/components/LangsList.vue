<template lang="pug">
	v-layout.mb-5(v-if="r.is_lang_read")
		v-btn.mr-2(
			v-for="lang in langs"
			:key="lang.slug"
			depressed
			@click="getLang(lang.id)"
		) {{lang.slug}}
		v-btn(
			depressed
			@click="addLang"
		)
			v-icon add
		v-dialog(
			v-model="isLangDialog"
			max-width="500px"
		)
			lang-dialog(
				:operationType="operationType"
			)
</template>

<script>
import LangDialog from "./LangDialog";

export default {
  name: "LangsList",

  components: {
    LangDialog
  },

  data: () => ({
    isLangDialog: false,
    operationType: "create"
  }),

  computed: {
    langs() {
      return this.$store.getters["lang/getAll"];
    }
  },

  methods: {
    async getLang(id) {
      await this.$store.dispatch("lang/findByPk", {
        params: {
          id
        }
      });
      this.isLangDialog = true;
      this.operationType = "update";
    },

    addLang() {
      this.$store.dispatch("lang/clear");
      this.isLangDialog = true;
      this.operationType = "create";
    }
  }
};
</script>
