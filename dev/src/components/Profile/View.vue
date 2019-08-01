<template lang="pug">
	v-flex
		v-layout.wrap
			v-flex.xs12.md7.pr-2
				v-card.mb-3
					//- Общие данные
					v-card-title Общие данные
					v-card-text
						v-layout.wrap
							v-flex.md6.pr-3
								v-text-field(
									v-model="profile.lastname"
									label="Фамилия:"
									required
								)
							v-flex.md6
								v-text-field(
									v-model="profile.firstname"
									label="Имя:"
									required
								)
							v-flex.md6.pr-3
								v-text-field(
									v-model="profile.middlename"
									label="Отчество:"
									required
								)
							v-flex.md6
								v-text-field(
									v-model="profile.slug"
									label="Псевдоним:"
									@input="$v.profile.slug.$touch()"
									@blur="$v.profile.slug.$touch()"
									:error-messages="slugErrors"
									required
								)
				//- Контакты
				v-card.mb-3
					v-card-title Контакты
					v-card-text
						v-layout.wrap
							v-flex.md6.pr-3
								v-text-field(
									v-model="profile.email"
									label="E-mail:"
									:error-messages="emailErrors"
									required
									@input="$v.profile.email.$touch()"
									@blur="$v.profile.email.$touch()"
								)
							v-flex.md6
								v-text-field(
									v-model="profile.phone"
									mask="+7 (###) ###-##-##"
									:value="profile.phone"
									label="Телефон:"
									required
								)
							v-flex.md6.pr-3
								v-text-field(
									v-model="profile.vkontakte"
									:value="profile.vkontakte"
									label="Vkontakte:"
									required
								)
							v-flex.md6
								v-text-field(
									v-model="profile.facebook"
									:value="profile.facebook"
									label="Facebook:"
									required
								)
							v-flex.md6.pr-3
								v-text-field(
									v-model="profile.instagram"
									:value="profile.instagram"
									label="Instagram:"
									required
								)
				//- Ключи
				v-expansion-panel(expand v-if="(adminAccess || managerAccess) && operationType === 'update'")
					v-expansion-panel-content
						template(v-slot:header)
							div Ключи
						v-card
							v-card-text
								v-flex.md12
									div Api key: sdfew45frs4e3qwvfdrt5e4rt354tvfds
				//- Изменение пароля
				password-change(v-if="operationType === 'update'")
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

				v-card
					v-card-actions
						v-btn.ml-2(
							color="primary"
							@click="create"
							v-if="operationType === 'create'"
						) Создать
						v-btn.ml-2(
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
								img(:src="`${imgFolderBasePath}/${profile.image}`")
								div.avatar-mask
									v-icon(color="#fff") add_circle_outline
					v-card-title.text-md-center.justify-center.mt-4.pb-0 Аватар
					v-card-title.title.font-weight-bold.text-md-center.justify-center {{profile.lastname}} {{profile.firstname}}
				//- Роль и ранг
				v-card(v-if="adminAccess")
					v-card-text
						v-select(
							:items="['admin', 'manager']"
							item-text="title"
							label="Роль:"
							v-model="profile.role"
							required
						)
						v-select(
							:items="[9999, 1]"
							item-text="title"
							label="Ранг:"
							v-model="profile.rang"
							required
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
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";
import { validationMixin } from "vuelidate";
import panelMixin from "@/mixins/panelMixin";
// Components
import PasswordChange from "@/components/Profile/PasswordChange";
// Libs
import {
  required,
  minLength,
  helpers,
  sameAs,
  email
} from "vuelidate/lib/validators";
const alpha = helpers.regex("alpha", /^[a-zA-Z0-9_-]*$/);
// Config
import { imgFolderBasePath } from "@/config";

export default {
  name: "ProfileView",

  components: {
    PasswordChange
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
      imgFolderBasePath,
      showPassword: false,
      showConfirmPassword: false,
      password: "",
      confirmPassword: "",
      isRemoveDialog: false
    };
  },

  computed: {
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
    /**
     * @function create
     * @async
     * Функция для создания профиля
     * вызывает action {@link store/profile/create}
     * TODO: после удачного создания пользователя
     * делать редирект на его профиль получая его
     * данные через {@link store/user/fetch} для
     * дальнейшего редактирования
     */
    create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.profile.password = this.password;
        this.$store.dispatch("profile/create", this.profile);
      }
    },

    /**
     * @function update
     * @async
     * Функция обновления профиля
     * вызывает action {@link store/profile/update}
     */
    async update() {
      this.$v.profile.$touch();
      if (!this.$v.profile.$error) {
        await this.$store.dispatch("profile/update", this.profile);
      }
    },

    /**
     * @function remove
     * @async
     * Удаление пользователя через
     * action {@link store/profile/remove}
     * @if Если параметр id у роутинга существует,
     * то @if Если параметр id роутинга равен id
     * {@link store/profile/get} текущего пользователя,
     * то редирект на главную @else иначе редирект
     * на страницу пользователей
     * @else редирект на главную
     */
    async remove() {
      await this.$store.dispatch("profile/remove", this.profile.id);
      if (this.$route.params.id) {
        if (this.$route.params.id === this.$store.getters["profile/get"].id) {
          this.$router.push("/");
        } else {
          this.$router.push("/users");
        }
      } else {
        this.$router.push("/");
      }
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
