<template lang="pug">
	v-card.pt-4(outlined)
		v-card-text.px-4
			v-text-field(
				v-model="item.slug"
				:label="`${d.slug || 'Slug'}:`"
				@input="$v.item.slug.$touch()"
				@blur="$v.item.slug.$touch()"
				:error-messages="slugErrors"
			)
			v-text-field(
				v-model="item.title"
				:label="`${d.name || 'Name'}:`"
				@input="$v.item.title.$touch()"
				@blur="$v.item.title.$touch()"
				:error-messages="titleErrors"
			)
			v-select(
				v-model="item.contextId"
				:items="contexts"
				item-text="title"
				item-value="id"
				:label="`${d.context || 'Context'}:`"
			)
			v-text-field(
				v-model="item.cost"
				:label="`${d.cost || 'Cost'}:`"
				type="number"
			)
			v-text-field(
				v-model="item.country"
				:label="`${d.country || 'Country'}:`"
			)
			v-text-field(
				v-model="item.region"
				:label="`${d.region || 'Region'}:`"
			)
			v-text-field(
				v-model="item.city"
				:label="`${d.city || 'City'}:`"
			)
			v-text-field(
				v-model="item.district"
				:label="`${d.district || 'District'}:`"
			)
			v-text-field(
				v-model="item.street"
				:label="`${d.street || 'Street'}:`"
			)
			v-text-field(
				v-model="item.house"
				:label="`${d.house || 'Home'}:`"
			)
			v-text-field(
				v-model="item.apartment"
				:label="`${d.apartment || 'Apartment'}:`"
			)
			v-text-field(
				v-model="item.fullAddress"
				:label="`${d.full_address || 'Full address'}:`"
			)
			v-textarea(
				v-model="item.schema"
				:label="d.value || 'Schema'"
			)
		v-card-actions.px-4.pb-4
			v-btn(
				@click="update"
				color="primary"
				depressed
				v-if="operationType === 'update' && r.is_delivery_update"
			) {{d.save || 'Save'}}
			v-btn(
				@click="create"
				color="primary"
				depressed
				v-if="operationType === 'create' && r.is_delivery_create"
			) {{d.create || 'Create'}}
			v-btn(
				@click="remove"
				color="error"
				depressed
				v-if="operationType === 'update' && r.is_delivery_delete"
			) {{d.remove || 'Remove'}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required, minLength, helpers } from "vuelidate/lib/validators";

const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "Delivery",

  mixins: [validationMixin],

  validations: {
    item: {
      slug: { required, alpha, minLength: minLength(3) },
      title: { required, minLength: minLength(3) }
    }
  },

  props: {
    operationType: {
      type: String,
      default: "create"
    },
    item: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    contexts() {
      return this.$store.getters["context/getAll"];
    },

    slugErrors() {
      const errors = [];
      if (!this.$v.item.slug.$dirty) return errors;
      !this.$v.item.slug.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.item.slug.alpha &&
        errors.push(
          `${this.d.only_en_symbols || "Only latin characters allowed"}`
        );
      !this.$v.item.slug.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    titleErrors() {
      const errors = [];
      if (!this.$v.item.title.$dirty) return errors;
      !this.$v.item.title.minLength &&
        errors.push(
          `${this.d.field_must_be_have_more_three_sumbols ||
            "The field must be at least 3 characters"}`
        );
      !this.$v.item.title.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  methods: {
    async update() {
      this.$v.$touch();
      if (!this.$v.$error && this.r.is_delivery_update) {
        if (!this.item.contextId || this.item.contextId === "") {
          this.item.contextId = this.$store.getters["profile/get"].context.id;
        }

        await this.$store.dispatch("shop/delivery/update", {
          params: {
            id: this.item.id
          },
          body: this.item
        });
        this.$emit("update", this.item);
      }
    },

    async create() {
      this.$v.$touch();
      if (!this.$v.$error && this.r.is_delivery_create) {
        if (!this.item.contextId && this.item.contextId === "") {
          this.item.contextId = this.$store.getters["profile/get"].context.id;
        }

        await this.$store.dispatch("shop/delivery/create", {
          body: this.item
        });
        this.$emit("create", this.item);
        this.$store.dispatch("shop/delivery/clear");
      }
    },

    async remove() {
      if (this.r.is_delivery_delete) {
        await this.$store.dispatch("shop/delivery/remove", {
          params: { id: this.item.id }
        });

        const deliveries = this.$store.getters["shop/delivery/getAll"].filter(
          el => {
            if (el.id !== this.item.id) {
              return el;
            }
          }
        );
        this.$store.dispatch("shop/delivery/setAll", deliveries);

        this.$store.dispatch("shop/delivery/clear");
        this.$emit("remove", this.item);
      }
    }
  }
};
</script>
