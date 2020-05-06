<template lang="pug">
	v-flex(v-if="r.is_lexicon_read")
		v-card(outlined)
			v-toolbar(flat color="white")
				v-spacer
				v-btn(
					depressed
					color="primary"
					to="/context-create"
					dark
					v-if="r.is_lexicon_create"
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
								a {{ item.slug }}
							td.text-xs-left
								a {{ item.value }}
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
</template>

<script>
export default {
  name: "LexiconsListComponent",

  metaInfo() {
    return {
      title: `${this.d.lexicons || "Lexicons"}`
    };
  },

  data() {
    return {
      isRemoveDialog: false,
      removeItem: {},
      limit: 10
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

      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            where: {
              langId: this.$store.getters["lang/get"].id
            }
          }
        }
      };
      await this.$store.dispatch("lexicon/findAll", data);
    }
  }
};
</script>
