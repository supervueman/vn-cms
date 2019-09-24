<template lang="pug">
	v-layout.wrap
		v-flex.xs12.md7.pr-2
			v-card.mb-3
				//- Общие данные
				v-card-text Общие данные
				v-card-text
					v-layout.wrap
						v-flex.md6.pr-3
							v-text-field(
								v-model="profile.lastname"
								label="Фамилия:"
							)
						v-flex.md6
							v-text-field(
								v-model="profile.firstname"
								label="Имя:"
							)
						v-flex.md6.pr-3
							v-text-field(
								v-model="profile.middlename"
								label="Отчество:"
							)
						v-flex.md6
							v-text-field(
								v-model="profile.slug"
								label="Псевдоним:"
								@input="$v.profile.slug.$touch()"
								@blur="$v.profile.slug.$touch()"
								:error-messages="slugErrors"
							)
			//- Контакты
			v-card.mb-3
				v-card-text Контакты
				v-card-text
					v-layout.wrap
						v-flex.md6.pr-3
							v-text-field(
								v-model="profile.email"
								label="E-mail:"
								:error-messages="emailErrors"
								@input="$v.profile.email.$touch()"
								@blur="$v.profile.email.$touch()"
							)
						v-flex.md6
							v-text-field(
								v-model="profile.phone"
								v-mask="'+7 (###) ###-##-##'"
								:value="profile.phone"
								label="Телефон:"
							)
						v-flex.md6.pr-3
							v-text-field(
								v-model="profile.vkontakte"
								:value="profile.vkontakte"
								label="Vkontakte:"
							)
						v-flex.md6
							v-text-field(
								v-model="profile.facebook"
								:value="profile.facebook"
								label="Facebook:"
							)
						v-flex.md6.pr-3
							v-text-field(
								v-model="profile.instagram"
								:value="profile.instagram"
								label="Instagram:"
							)
			//- Ключи
			v-expansion-panels(v-if="operationType === 'update'")
				v-expansion-panel
					v-expansion-panel-header Ключи
					v-expansion-panel-content
						v-flex.md12
							div Api key: {{profile.token}}
			//- Изменение пароля
			password-change(
				v-if="operationType === 'update'"
				:userId="profile.id"
			)
			//- Создание пароля
			v-card(v-if="operationType === 'create'" tag="form")
				v-card-text
					v-layout.wrap
						v-flex.md6.pr-3
							v-text-field(
								v-model="password"
								label="Введите пароль:"
								:type="showPassword ? 'text' : 'password'"
								:append-icon="showPassword ? 'visibility' : 'visibility_off'"
								@click:append="showPassword = !showPassword"
								:error-messages="passwordErrors"
								@input="$v.password.$touch()"
								@blur="$v.password.$touch()"
							)
						v-flex.md6.pr-3
							v-text-field(
								v-model="confirmPassword"
								label="Повторите пароль:"
								:type="showConfirmPassword ? 'text' : 'password'"
								:append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'"
								@click:append="showConfirmPassword = !showConfirmPassword"
								:error-messages="confirmPasswordErrors"
								@input="$v.confirmPassword.$touch()"
								@blur="$v.confirmPassword.$touch()"
							)

			v-layout.pt-2
				v-btn.mr-2(
					color="primary"
					@click="create"
					v-if="operationType === 'create'"
				) Создать
				v-btn.mr-2(
					color="primary"
					@click="update"
					v-if="operationType === 'update'"
				) Сохранить
				v-btn(
					color="error"
					@click="isRemoveDialog = true"
					v-if="operationType === 'update'"
				) Удалить
		//- Аватар
		v-flex.xs12.md5.pl-2
			v-card.pt-3.mb-3(v-if="operationType === 'update'")
				v-card-text.py-0.justify-center.d-flex
					v-layout.justify-center
						v-avatar(size="150" color="#fff" class="avatar")
							img(:src="`/static/${profile.image}`")
							div.avatar-mask(@click="isActiveDialog = true")
								v-icon(color="#fff") add_circle_outline
				v-card-text.text-md-center.justify-center.mt-4.pb-0 Аватар
				v-card-title.title.font-weight-bold.text-md-center.justify-center {{profile.lastname}} {{profile.firstname}}
			//- Роль и ранг
			v-card(v-if="this.$route.name !== 'profile'")
				v-card-text
					v-select(
						:items="roles"
						item-text="title"
						label="Роль:"
						return-object
						@change="profile.roleId = $event.id"
						:value="profileRole"
					)
		v-dialog(
			v-model="isRemoveDialog"
			max-width="500px"
		)
			remove-confirm(
				@remove="remove"
				:isActive.sync="isRemoveDialog"
				:name="`${profile.lastname} ${profile.firstname}`"
			)
		v-dialog(v-model="isActiveDialog")
			filesystem(@selectFile="selectFile")
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";
import panelMixin from "@/mixins/panelMixin";

// Components
import PasswordChange from "@/components/Profile/PasswordChange";
import { mask } from "vue-the-mask";
import Filesystem from "@/components/Filesystem/Filesystem";

// Libs
import {
  required,
  minLength,
  helpers,
  sameAs,
  email
} from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);

export default {
  name: "ProfileView",

  directives: {
    mask
  },

  components: {
    PasswordChange,
    Filesystem
  },

  mixins: [validationMixin, accessMixin, panelMixin],

  props: {
    profile: {
      type: Object,
      default() {
        return {};
      }
    },
    operationType: {
      type: String,
      default: "update"
    }
  },

  validations: {
    profile: {
      slug: { required, alpha, minLength: minLength(3) },
      email: { required, email }
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password")
    }
  },

  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      password: "",
      confirmPassword: "",
      isRemoveDialog: false,
      isActiveDialog: false
    };
  },

  computed: {
    roles() {
      return this.$store.getters["role/getAll"];
    },
    profileRole() {
      return this.profile.role;
    },
    slugErrors() {
      const errors = [];
      if (!this.$v.profile.slug.$dirty) return errors;
      !this.$v.profile.slug.minLength &&
        errors.push("Псевдоним должен быть не менее 3 символов!");
      !this.$v.profile.slug.alpha &&
        errors.push("Разрешены только английские символы!");
      !this.$v.profile.slug.required && errors.push("Обязательное поле!");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.profile.email.$dirty) return errors;
      !this.$v.profile.email.email && errors.push("E-mail не валиден!");
      !this.$v.profile.email.required && errors.push("Обязательное поле!");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Обязательное поле!");
      !this.$v.password.minLength &&
        errors.push("Пароль должен быть не менее 6 символов!");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required && errors.push("Обязательное поле!");
      !this.$v.confirmPassword.minLength &&
        errors.push("Пароль должен быть не менее 6 символов!");
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push("Пароли не совпадают!");
      return errors;
    }
  },

  methods: {
    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.profile.password = this.password;
        await this.$store.dispatch("profile/createByEmail", {
          body: this.profile
        });
      }
    },

    async update() {
      this.$v.profile.$touch();
      const data = {
        body: this.profile,
        query: {
          filter: {
            include: ["role"]
          }
        }
      };
      if (!this.$v.profile.$error) {
        if (this.profile.id === this.$store.getters["profile/get"].id) {
          await this.$store.dispatch("profile/update", data);
        } else {
          await this.$store.dispatch("user/update", data);
        }
      }
    },

    async remove() {
      if (this.profile.id === this.$store.getters["profile/get"].id) {
        await this.$store.dispatch("profile/remove");
        this.$router.push("/");
      } else {
        await this.$store.dispatch("user/remove", {
          body: { id: this.profile.id }
        });
        this.$router.push("/users");
      }
    },

    selectFile(file) {
      this.profile.image = file.path;
    }
  }
};
</script>

<style lang="sass">
.avatar
	margin: auto
	overflow: hidden
	.avatar-mask
		position: absolute
		bottom: 0
		left: 0
		width: 100%
		height: 50px
		background-color: rgba(#062745, 0.9)
		transition: transform 0.5s
		transform: translateY(100%)
		cursor: pointer
		display: flex
		justify-content: center
		align-items: center
	&:hover
		.avatar-mask
			transform: translateY(0)
</style>
