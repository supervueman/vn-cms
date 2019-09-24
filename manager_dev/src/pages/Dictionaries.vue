<template lang="pug">
	v-flex(v-if="adminAccess")
		.body-2.mb-12.mt-2 {{d.dictionaries}}
		v-layout.wrap
			v-flex
				v-toolbar(flat color="white")
					v-spacer
					v-btn.mr-2(
						color="primary"
						dark
						v-if="dictionaries.length > 0"
						@click="update"
					) {{d.save}}
					v-btn(
						color="primary"
						dark
						@click="isDictionaryCreate = true"
					) {{d.create_dictionary}}
		v-layout.dictionary
			v-flex.px-2.dictionary--list-text
				v-flex
					v-text-field(
						label="Псевдоним"
						v-model="createSlug"
						append-icon="add"
						@click:append="addItem"
					)
				v-flex(
					v-for="(item, key) in dictionary.value"
					:key="key"
				)
					v-text-field(
						:value="key"
						label="Псевдоним"
						append-icon="remove"
						@click:append="isRemoveItem = true; removeItemSlug = key"
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
						)
						v-btn.mb-4(
							color="error"
							@click="isRemoveDictionary = true; removeDictionary = dictionary"
						) Удалить

		v-dialog(
			v-model="isRemoveDictionary"
			max-width="500px"
		)
			remove-confirm(
				@remove="remove"
				:isActive.sync="isRemoveDictionary"
				:name="`${removeDictionary.title} ${d.dictionary}`"
			)
		
		v-dialog(
			v-model="isRemoveItem"
			max-width="500px"
		)
			remove-confirm(
				@remove="removeItem"
				:isActive.sync="isRemoveItem"
				:name="`${removeItemSlug}`"
			)
		
		v-dialog(
			v-model="isDictionaryCreate"
			max-width="500px"
		)
			v-card
				v-card-title.px-4 {{d.create_dictionary}}
				v-card-text.px-4
					v-text-field(
						label="Псевдоним"
						v-model="createDictionary.lang"
						:error-messages="langErrors"
						@input="$v.createDictionary.lang.$touch()"
						@blur="$v.createDictionary.lang.$touch()"
					)
					v-text-field(
						label="Название"
						v-model="createDictionary.title"
						:error-messages="titleErrors"
						@input="$v.createDictionary.title.$touch()"
						@blur="$v.createDictionary.title.$touch()"
					)
				v-card-actions
					v-btn.ml-2(
						color="primary"
						@click="create"
					) {{d.create}}
					v-btn(
						color="error"
						@click="isDictionaryCreate = false"
					) {{d.cancel}}
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z_]*$/);

export default {
  name: "Dictionaries",
  mixins: [accessMixin, validationMixin],

  validations: {
    createDictionary: {
      lang: { required, alpha, minLength: minLength(2) },
      title: { required, minLength: minLength(3) }
    }
  },

  data() {
    return {
      isRemoveDictionary: false,
      isRemoveItem: false,
      removeDictionary: {},
      searchBySlug: "",
      searchByText: "",
      isDictionaryCreate: false,
      createDictionary: {
        lang: "",
        title: "",
        value: {}
      },
      createSlug: "",
      removeItemSlug: "",

      // Tabs settings
      prevIcon: false,
      nextIcon: false
    };
  },

  computed: {
    dictionaries() {
      return this.$store.getters["dictionary/getAll"];
    },

    langErrors() {
      const errors = [];
      if (!this.$v.createDictionary.lang.$dirty) return errors;
      !this.$v.createDictionary.lang.minLength &&
        errors.push("Псевдоним должен быть не менее 2 символов!");
      !this.$v.createDictionary.lang.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.createDictionary.lang.required &&
        errors.push("Обязательное поле!");
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.createDictionary.title.$dirty) return errors;
      !this.$v.createDictionary.title.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.createDictionary.title.required &&
        errors.push("Обязательное поле!");
      return errors;
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
    async create() {
      this.$v.createDictionary.$touch();
      if (!this.$v.createDictionary.$error) {
        for (let key in this.dictionary.value) {
          this.createDictionary.value[key] = "";
        }
        await this.$store.dispatch("dictionary/create", {
          body: {
            ...this.createDictionary,
            value: JSON.stringify(this.createDictionary.value)
          }
        });
        this.isDictionaryCreate = false;
        this.createDictionary.lang = "";
        this.createDictionary.title = "";
      }
    },

    async update() {
      for await (let dictionary of this.dictionaries) {
        const newDictionary = {
          ...dictionary,
          value: JSON.stringify(dictionary.value)
        };

        await this.$store.dispatch("dictionary/update", {
          body: newDictionary
        });
      }
    },

    async remove() {
      await this.$store.dispatch("dictionary/remove", {
        body: { id: this.removeDictionary.id }
      });
      const dictionaries = this.dictionaries.filter(el => {
        if (el.id !== this.removeDictionary.id) {
          return el;
        }
      });
      this.$store.dispatch("dictionary/setAll", dictionaries);
    },

    addItem() {
      this.dictionary.value[this.createSlug] = {
        text: ""
      };
      this.dictionaries.forEach(el => {
        el.value[this.createSlug] = {
          text: ""
        };
      });
      this.$store.dispatch("dictionary/setAll", this.dictionaries);
      this.$store.dispatch("dictionary/set", this.dictionary);
      this.createSlug = "";
    },

    removeItem() {
      delete this.dictionary.value[this.removeItemSlug];
      this.dictionaries.forEach(el => {
        delete el.value[this.removeItemSlug];
      });
      this.$store.dispatch("dictionary/setAll", this.dictionaries);
      this.$store.dispatch("dictionary/set", this.dictionary);
    }
  }
};
</script>

<style lang="sass">
	.dictionary
		background-color: #fff
		&--tab-item
			margin-top: 26px
		&--list-text
			max-width: 300px
			flex: auto
</style>
