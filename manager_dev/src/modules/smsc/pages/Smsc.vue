<template lang="pug">
	v-flex(v-if="r.is_smsc_setting_read")
		v-layout
			.body-2.mt-2.mb-12 {{d.smsc_settings || 'Smsc settings'}}
			v-spacer
			balance
			v-btn(
				color="primary"
				depressed
				to="/smsc/send"
			) {{d.send_sms || 'Send sms'}}
		v-flex.xs12.md7.pr-2
			v-card.mb-2(outlined)
				v-card-text {{d.common_data || 'Common data'}}
				v-card-text
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="smsc.login"
								:label="`${d.smsc_login || 'Login'}:`"
								v-on="on"
								@input="$v.smsc.login.$touch()"
								@blur="$v.smsc.login.$touch()"
								:error-messages="loginErrors"
								name="smsc-login"
							)
						span login
					v-tooltip(top)
						template(v-slot:activator="{ on }")
							v-text-field(
								v-model="smsc.password"
								:label="`${d.password || 'Password'}:`"
								:type="showPassword ? 'text' : 'password'"
								:append-icon="showPassword ? 'visibility' : 'visibility_off'"
								@click:append="showPassword = !showPassword"
								:error-messages="passwordErrors"
								@input="$v.smsc.password.$touch()"
								@blur="$v.smsc.password.$touch()"
								v-on="on"
								name="smsc-password"
							)
						span password
				v-card-actions.px-4.pb-4
					v-spacer
					v-btn(
						color="primary"
						depressed
						@click="create"
						v-if="!smsc.id"
					) {{d.create || 'Create'}}
					v-btn(
						color="primary"
						depressed
						@click="update"
						v-if="smsc.id"
					) {{d.save || 'Save'}}
					v-btn(
						color="error"
						depressed
						@click="remove"
						v-if="smsc.id"
					) {{d.remove || 'Remove'}}
</template>

<script>
import { validationMixin } from "vuelidate";

// Libs
import { required } from "vuelidate/lib/validators";

// Components
import Balance from "../components/Balance";

export default {
  name: "SmscSettingsPage",

  components: {
    Balance
  },

  metaInfo() {
    return {
      title: `${this.d.smsc_settings || "Smsc settings"}`
    };
  },

  mixins: [validationMixin],

  validations: {
    smsc: {
      login: { required },
      password: { required }
    }
  },

  data() {
    return {
      isRemoveDialog: false,
      showPassword: false
    };
  },

  computed: {
    smsc() {
      return this.$store.getters["smsc/get"];
    },
    loginErrors() {
      const errors = [];
      if (!this.$v.smsc.login.$dirty) return errors;
      !this.$v.smsc.login.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.smsc.password.$dirty) return errors;
      !this.$v.smsc.password.required &&
        errors.push(`${this.d.required_field || "Required field"}`);
      return errors;
    }
  },

  async mounted() {
    await this.$store.dispatch("smsc/findOne");
  },

  methods: {
    async create() {
      this.$v.$touch();

      if (this.r.is_smsc_setting_create && !this.$v.$error) {
        await this.$store.dispatch("smsc/create", {
          body: this.smsc
        });
      }
    },

    async update() {
      this.$v.$touch();

      if (this.r.is_smsc_setting_update && !this.$v.$error) {
        await this.$store.dispatch("smsc/update", {
          body: this.smsc
        });
      }
    },

    async remove() {
      if (this.r.is_smsc_setting_delete) {
        const bool = await this.$store.dispatch("smsc/remove", {
          params: { id: this.smsc.id }
        });

        if (bool) {
          this.$store.dispatch("smsc/clear");
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("resource/clear");
    next();
  }
};
</script>

<style lang="sass">
.theme--light.v-tabs-items
	background-color: transparent
</style>
