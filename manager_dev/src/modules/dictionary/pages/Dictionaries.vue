<template lang="pug">
	v-flex(v-if="r.is_dictionary_read")
		.body-2.mb-12.mt-2 {{d.dictionaries || 'Dictionaries'}}
		v-flex
			v-card(outlined)
				dictionaries-toolbar(
					:dictionariesLength="dictionaries.length"
					@update="update"
					@openCreateDialog="isDictionaryCreate = true"
				)

				v-layout.dictionary
					dictionary-list(
						@addItem="addItem($event)"
						@removeItem="removeItem($event)"
					)

					v-flex.px-2
						v-tabs(
							:grow="true"
							:prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
							:next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
						)
							v-tabs-slider

							v-tab.dictionary--tab(
								v-for="dictionary in dictionaries"
								:key="dictionary.lang"
								:href="`#tab-${dictionary.lang}`"
							) {{ dictionary.lang }}

							v-tab-item.dictionary--tab-item(
								v-for="dictionary in dictionaries"
								:key="dictionary.lang"
								:value="`tab-${dictionary.lang}`"
							)
								v-text-field(
									v-for="(item, key, i) in dictionary.value"
									:key="`${item}-${dictionary.lang}-${i}`"
									:label="key"
									v-model="item.text"
									:disabled="!r.is_dictionary_update"
								)
								.d-flex.justify-center
									v-btn.mb-4(
										text
										depressed
										color="error"
										@click="isRemoveDictionary = true; removeDictionary = dictionary"
										v-if="r.is_dictionary_delete"
									) Удалить

		v-dialog(
			v-model="isRemoveDictionary"
			max-width="500px"
		)
			remove-confirm(
				@remove="remove"
				:isActive.sync="isRemoveDictionary"
				:name="`${removeDictionary.title} ${d.dictionary || 'Dictionary'}`"
			)

		v-dialog(
			v-model="isDictionaryCreate"
			max-width="500px"
		)
			dictionary-create-card(
				@cancel="isDictionaryCreate = $event"
				@create="create($event)"
			)
</template>

<script>
// Components
import DictionariesToolbar from "../components/DictionariesToolbar";
import DictionaryCreateCard from "../components/DictionaryCreateCard";
import DictionaryList from "../components/DictionaryList";

export default {
  name: "DictionariesPage",

  components: {
    DictionaryCreateCard,
    DictionariesToolbar,
    DictionaryList
  },

  metaInfo() {
    return {
      title: `${this.d.dictionaries || "Dictionaries"}`
    };
  },

  data: () => ({
    isRemoveDictionary: false,
    removeDictionary: {},
    isDictionaryCreate: false,

    // Tabs settings
    prevIcon: false,
    nextIcon: false
  }),

  computed: {
    dictionaries() {
      return this.$store.getters["dictionary/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("dictionary/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async create(event) {
      const dictionary = event;
      for (let key in this.dictionary.value) {
        dictionary.value[key] = { text: "" };
      }
      await this.$store.dispatch("dictionary/create", {
        body: {
          lang: dictionary.lang,
          title: dictionary.title,
          value: JSON.stringify(dictionary.value)
        }
      });
      this.isDictionaryCreate = false;
    },

    async update() {
      if (this.r.is_dictionary_update) {
        for await (let dictionary of this.dictionaries) {
          const newDictionary = {
            ...dictionary,
            value: JSON.stringify(dictionary.value)
          };

          await this.$store.dispatch("dictionary/update", {
            body: newDictionary
          });
        }
      }
    },

    async remove() {
      if (this.r.is_dictionary_delete) {
        await this.$store.dispatch("dictionary/remove", {
          body: { id: this.removeDictionary.id }
        });
        const dictionaries = this.dictionaries.filter(el => {
          if (el.id !== this.removeDictionary.id) {
            return el;
          }
        });
        this.$store.dispatch("dictionary/setAll", dictionaries);
      }
    },

    addItem(item) {
      if (this.r.is_dictionary_update) {
        this.dictionaries.forEach(el => {
          el.value[item] = {
            text: ""
          };
        });
        this.$store.dispatch("dictionary/setAll", this.dictionaries);
        this.createSlug = "";
      }
    },

    removeItem(item) {
      if (this.r.is_dictionary_update) {
        this.dictionaries.forEach(el => {
          delete el.value[item];
        });
        this.$store.dispatch("dictionary/setAll", this.dictionaries);
      }
    }
  }
};
</script>

<style lang="sass">
	.dictionary
		&--tab-item
			margin-top: 26px
		&--list-text
			max-width: 300px
			flex: auto
</style>
