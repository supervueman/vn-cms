const mixin = {
  computed: {
    // Основной язык
    mainLang() {
      return this.$store.getters['base/getMainLang'];
    },
    // правила
    r() {
      return this.$store.getters['profile/getRules'];
    },
    // Словарь
    dictionary() {
      return this.$store.getters['dictionary/get'];
    },
    // Слова из словаря
    d() {
      const dictionary = {};
      if (this.$store.getters['dictionary/get'].value) {
        for (let key in this.$store.getters['dictionary/get'].value) {
          dictionary[key] = this.$store.getters['dictionary/get'].value[key].text;
        }
      }

      return dictionary;
    },
    // админский доступ
    adminAccess() {
      const profile = this.$store.getters['profile/get'];
      return profile.role.slug === 'admin' && !!profile.id && profile.id !== undefined;
    },
    // Проверка авторизации
    isAuth() {
      const profile = this.$store.getters['profile/get'];
      return profile.id !== 0 && profile.id !== undefined && !!profile.id;
    }
  },
};

export default mixin;
