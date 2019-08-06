const mixin = {
  computed: {
    adminAccess() {
      const profile = this.$store.getters['profile/get'];
      return profile.role.slug === 'admin' && profile.id !== '' && profile.id !== undefined;
    },
    managerAccess() {
      const profile = this.$store.getters['profile/get'];
      return profile.role.slug === 'manager' && profile.id !== '' && profile.id !== undefined;
    },
    courierAccess() {
      const profile = this.$store.getters['profile/get'];
      return profile.role.slug === 'courier' && profile.id !== '' && profile.id !== undefined;
    },
    userAccess() {
      const profile = this.$store.getters['profile/get'];
      return profile.role.slug === 'user' && profile.id !== '' && profile.id !== undefined;
    },
    isAuth() {
      const profile = this.$store.getters['profile/get'];
      return profile.id !== 0 && profile.id !== undefined && profile.id !== '';
    }
  }
}

export default mixin;
