<template lang="pug">
	v-flex(v-if="r.is_lexicon_read")
		v-card(outlined)
			v-toolbar(flat color="white")
				v-spacer
				v-text-field.mr-2(
					v-model="lexiconSlug"
					:label="`${d.slug || 'Slug'}`"
				)
				v-text-field.mr-2(
					v-model="lexiconValue"
					:label="`${d.value || 'Value'}`"
				)
				v-select.mr-2(
					v-model="langId"
					:items="langs"
					item-text="title"
					item-value="id"
					:label="`${d.lang || 'Lang'}`"
				)
				v-btn.mr-2(text @click="search")
					v-icon search
				v-btn(
					depressed
					color="primary"
					dark
					v-if="r.is_lexicon_create"
					@click="addLexicon"
				) {{d.create_lexicon || 'Create lexicon'}}
			v-data-table(
				:headers="headers"
				:items="lexicons"
				:items-per-page-options="[limit]"
				hide-default-footer
			)
				template(v-slot:body="{items}")
					tbody
						tr(v-for="item in items" :key="item.id")
							td.text-xs-left
								a(@click="getLexicon(item.id)") {{ item.slug }}
							td.text-xs-left
								a(@click="getLexicon(item.id)") {{ item.value }}
							td.text-end
								v-btn(
									text
									fab
									color="primary"
									@click="removeDialogOpen(item)"
									v-if="r.is_lexicon_delete && item.slug !== 'root'"
								)
									v-icon delete
			v-card-actions.text-xs-center.pt-2
				pagination(
					:itemsLength="count"
					@getPage="getPage"
					:limit="limit"
				)
		v-dialog(
			v-model="isRemoveDialog"
			max-width="500px"
		)
			remove-confirm(
				@remove="remove"
				:isActive.sync="isRemoveDialog"
				:name="removeItem.title"
			)
		v-dialog(
			v-model="isLexiconDialog"
			max-width="500px"
		)
			lexicon-dialog(:operationType="operationType")
</template>

<script>
import LexiconDialog from "./LexiconDialog";

export default {
  name: "LexiconsListComponent",

  components: {
    LexiconDialog
  },

  metaInfo() {
    return {
      title: `${this.d.lexicons || "Lexicons"}`
    };
  },

  data() {
    return {
      isRemoveDialog: false,
      removeItem: {},
      isLexiconDialog: false,
      limit: 10,
      operationType: "create",
      langId: null,
      lexiconSlug: "",
      lexiconValue: ""
    };
  },

  computed: {
    headers() {
      return [
        {
          text: `${this.d.slug || "Slug"}`,
          value: "slug"
        },
        {
          text: `${this.d.value || "Value"}`,
          value: "value"
        },
        { text: "", sortable: false }
      ];
    },
    lexicons() {
      return this.$store.getters["lexicon/getAll"];
    },
    count() {
      return this.$store.getters["lexicon/getCount"];
    },
    langs() {
      return this.$store.getters["lang/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("lang/findOne", {
      query: {
        filter: {
          where: {
            slug: this.$store.getters["base/getMainLang"]
          },
          limit: this.limit,
          offset: 0
        }
      }
    });
    const data = {
      query: {
        filter: {
          order: [["createdAt", "DESC"]],
          where: {
            langId: this.$store.getters["lang/get"].id
          },
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit
        }
      }
    };
    await this.$store.dispatch("lexicon/findAll", {
      ...data
    });
    await this.$store.dispatch("lexicon/count", data);
  },

  methods: {
    async remove() {
      if (this.r.is_lexicon_delete) {
        await this.$store.dispatch("lexicon/remove", {
          params: { id: this.removeItem.id }
        });
        // Создаем новый массив без удаленного элемента
        const lexicons = this.lexicons.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });

        this.$store.dispatch("lexicon/setAll", lexicons);
      }
    },

    removeDialogOpen(lexicon) {
      this.removeItem = lexicon;
      this.isRemoveDialog = true;
    },

    async getPage({ offset, limit }) {
      const where = {};

      if (this.langId) {
        where.langId = this.langId;
      } else {
        where.langId = this.$store.getters["lang/get"].id;
      }
      if (this.lexiconSlug) {
        where.slug = this.lexiconSlug;
      }
      if (this.lexiconValue) {
        where.value = this.lexiconValue;
      }

      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            where
          }
        }
      };
      await this.$store.dispatch("lexicon/findAll", data);
    },

    async getLexicon(id) {
      await this.$store.dispatch("lexicon/findByPk", {
        params: { id }
      });
      this.isLexiconDialog = true;
      this.operationType = "update";
    },

    addLexicon() {
      this.$store.dispatch("lexicon/clear");
      this.isLexiconDialog = true;
      this.operationType = "create";
    },

    async search() {
      const where = {};

      if (this.langId) {
        where.langId = this.langId;
      } else {
        where.langId = this.$store.getters["lang/get"].id;
      }
      if (this.lexiconSlug) {
        where.slug = this.lexiconSlug;
      }
      if (this.lexiconValue) {
        where.value = this.lexiconValue;
      }

      const data = {
        query: {
          filter: {
            limit: this.$route.query.limit || 10,
            offset: this.$route.query.offset || 0,
            order: [["createdAt", "DESC"]],
            where
          }
        }
      };
      await this.$store.dispatch("lexicon/findAll", data);
    }
  }
};
</script>
