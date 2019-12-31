<template lang="pug">
  v-expansion-panels.elevation-0(outlined)
    v-expansion-panel.elevation-none(outlined)
      v-expansion-panel-header.px-4 {{d.change_password || 'Change password'}}
      v-expansion-panel-content.px-0
        v-layout.wrap
          v-flex.md6.pr-3
            v-text-field(
              v-model="oldPassword"
              :label="`${d.enter_old_password || 'Enter old password'}:`"
              :type="showOldPassword ? 'text' : 'password'"
              :append-icon="showOldPassword ? 'visibility' : 'visibility_off'"
              @click:append="showOldPassword = !showOldPassword"
              :error-messages="oldPasswordErrors"
              @input="$v.oldPassword.$touch()"
              @blur="$v.oldPassword.$touch()"
            )
          v-flex.md6
            v-text-field(
              v-model="newPassword"
              :label="`${d.enter_new_password || 'Enter new password'}:`"
              :type="showNewPassword ? 'text' : 'password'"
              :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
              @click:append="showNewPassword = !showNewPassword"
              :error-messages="newPasswordErrors"
              @input="$v.newPassword.$touch()"
              @blur="$v.newPassword.$touch()"
            )
          v-flex.md6.pr-3
            v-text-field(
              v-model="confirmNewPassword"
              :label="`${d.confirm_password || 'Confirm password'}:`"
              :type="showConfirmNewPassword ? 'text' : 'password'"
              :append-icon="showConfirmNewPassword ? 'visibility' : 'visibility_off'"
              @click:append="showConfirmNewPassword = !showConfirmNewPassword"
              :error-messages="confirmNewPasswordErrors"
              @input="$v.confirmNewPassword.$touch()"
              @blur="$v.confirmNewPassword.$touch()"
            )
      v-expansion-panel-content.px-0
        v-btn.mr-2(
          color="primary"
          depressed
          @click="changePassword"
        ) {{d.change || 'Change'}}
        v-btn(
          color="primary"
          depressed
          @click="clearPassword"
        ) {{d.cancel || 'Cancel'}}
</template>

<script>
// Mixins
import { validationMixin } from 'vuelidate';

// Libs
import { helpers, required, sameAs, minLength } from 'vuelidate/lib/validators';

export default {
	name: 'PasswordChange',

	mixins: [validationMixin],

	props: {
		profile: {
			type: Object,
			default: () => {}
		}
	},

	validations: {
		oldPassword: {
			required,
			minLength: minLength(6)
		},
		newPassword: {
			required,
			minLength: minLength(6)
		},
		confirmNewPassword: {
			required,
			minLength: minLength(6),
			sameAsPassword: sameAs('newPassword')
		}
	},

	data() {
		return {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			showOldPassword: false,
			showNewPassword: false,
			showConfirmNewPassword: false
		};
	},

	computed: {
		oldPasswordErrors() {
			const errors = [];
			if (!this.$v.oldPassword.$dirty) return errors;
			!this.$v.oldPassword.required && errors.push('Required field');
			!this.$v.oldPassword.minLength &&
				errors.push(
					`${this.d.field_must_be_have_more_six_sumbols ||
						'The field must be at least 6 characters'}`
				);
			return errors;
		},
		newPasswordErrors() {
			const errors = [];
			if (!this.$v.newPassword.$dirty) return errors;
			!this.$v.newPassword.required && errors.push('Required field');
			!this.$v.newPassword.minLength &&
				errors.push(
					`${this.d.field_must_be_have_more_six_sumbols ||
						'The field must be at least 6 characters'}`
				);
			return errors;
		},
		confirmNewPasswordErrors() {
			const errors = [];
			if (!this.$v.confirmNewPassword.$dirty) return errors;
			!this.$v.confirmNewPassword.required && errors.push('Required field');
			!this.$v.confirmNewPassword.minLength &&
				errors.push(
					`${this.d.field_must_be_have_more_six_sumbols ||
						'The field must be at least 6 characters'}`
				);
			!this.$v.confirmNewPassword.sameAsPassword &&
				errors.push('Passwords do not match!');
			return errors;
		}
	},

	methods: {
		async changePassword() {
			if (this.r.is_user_update) {
				this.$v.$touch();

				if (this.$v.$error) {
					return;
				}

				const data = {
					id: this.profile.id,
					oldPassword: this.oldPassword,
					newPassword: this.newPassword
				};

				await this.$store.dispatch('user/changePassword', { body: data });

				this.clearPassword();
			}
		},

		clearPassword() {
			this.oldPassword = '';
			this.newPassword = '';
			this.confirmNewPassword = '';
		}
	}
};
</script>
