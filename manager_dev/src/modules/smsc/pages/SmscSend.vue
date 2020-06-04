<template lang="pug">
	v-flex(v-if="r.is_smsc_setting_read")
		v-layout
			.body-2.mt-2.mb-12 {{d.smsc || 'Sms center'}}
			v-spacer
			balance
		v-flex.pr-2
			v-card.mb-2(outlined)
				v-card-text
					v-layout.align-center
						v-text-field(
							v-model="phone"
							:label="`${d.phone_number || 'Phone number'}`"
							@input="$v.phone.$touch()"
							@blur="$v.phone.$touch()"
							:error-messages="phoneErrors"
						)
						v-btn.ml-4.mr-4(
							fab
							dark
							color="primary"
							depressed
							small
							@click="addPhone"
						)
							v-icon(dark) mdi-plus
						v-btn(
							color="primary"
							depressed
							@click="selectAllSubscribers"
						) {{d.select_all_subscribers || 'Select all subscribers'}}
					v-chip.mr-2(
						close
						color="primary"
						text-color="white"
						close-icon="mdi-delete"
						@click:close="remove(phone)"
						v-for="(phone, i) in phones"
						:key="`${phone}-${i}`"
					) {{phone}}
					v-textarea(
						v-model="mes"
						:label="`${d.message || 'Message'}`"
						@input="$v.mes.$touch()"
						@blur="$v.mes.$touch()"
						:error-messages="mesErrors"
					)
					v-btn(
						color="primary"
						depressed
						@click="sendSms"
					) {{d.send_sms || 'Send sms'}}
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate";
// Libs
import { required, helpers } from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[0-9-(\) +]*$/);

// Components
import Balance from "../components/Balance";

export default {
  name: "SmscSendPage",

  components: {
    Balance
  },

  mixins: [validationMixin],

  validations: {
    phone: { required, alpha },
    mes: { required }
  },

  metaInfo() {
    return {
      title: `${this.d.smsc || "Sms center"}`
    };
  },

  data: () => ({
    phone: "",
    phones: [],
    mes: ""
  }),

  computed: {
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.alpha &&
        errors.push(
          `${this.d.only_numbers_and_symbols || "Only numbers and symbols"}`
        );
      !this.$v.phone.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },

    mesErrors() {
      const errors = [];
      if (!this.$v.mes.$dirty) return errors;
      !this.$v.mes.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },

    subscribers() {
      return this.$store.getters["smsc/getPhones"].map(el => `7${el.phone}`);
    }
  },

  methods: {
    async sendSms() {
      if (this.phones.length > 0 && this.mes !== "") {
        await this.$store.dispatch("smsc/sendSms", {
          body: {
            phones: this.phones,
            mes: this.mes
          }
        });
        await this.$store.dispatch("smsc/fetchBalance");
      } else {
        this.$store.dispatch("notification/fetch", {
          type: "error",
          message: `${this.d.data_is_not_valid || "Data is not valid"}!`,
          isActive: true
        });
      }
    },

    addPhone() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }
      const existPhone = this.phones.find(el => el === this.phone);

      if (existPhone) {
        this.$store.dispatch("notification/fetch", {
          type: "error",
          message: `${this.d.phone_is_exist || "Phone is exist"}!`,
          isActive: true
        });
        return;
      }

      this.phones.push(this.phone);
      this.phone = "";
    },

    async selectAllSubscribers() {
      await this.$store.dispatch("smsc/findPhones", {
        query: {
          filter: {
            where: {
              isSubscribe: false
            }
          }
        }
      });

      this.phones.push(...this.subscribers);
    },

    remove(phone) {
      this.phones = this.phones.filter(el => el !== phone);
    }
  }
};
</script>
