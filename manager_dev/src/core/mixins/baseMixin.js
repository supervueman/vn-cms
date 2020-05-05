const mixin = {
  computed: {
    // Основной язык
    adminLang() {
      // console.log(this.$store.getters['base/getMainLang']);
      return this.$store.getters['base/getAdminLang'];
    },
    // правила
    r() {
      return this.$store.getters['profile/getRules'];
    },
    // Слова из словаря
    d() {
      const dictionary = {};
      const lexicons = this.$store.getters['base/getLexicons'];

      lexicons.forEach((el) => {
        dictionary[el.slug] = el.value;
      });

      return dictionary;
    },
    // админский доступ
    adminAccess() {
      const profile = this.$store.getters['profile/get'];
      return (
        profile.role.slug === 'admin' &&
        !!profile.id &&
        profile.id !== undefined
      );
    },
    // Проверка авторизации
    isAuth() {
      const profile = this.$store.getters['profile/get'];
      return profile.id !== 0 && profile.id !== undefined && !!profile.id;
    }
  }
};

export default mixin;
