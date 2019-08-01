const mixin = {
  computed: {
    adminAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role === 'admin' && profile.rang === 9999 && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    managerAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role === 'manager' && profile.rang === 1 && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    userAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role === 'user' && profile.rang === 0 && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    }
  }
}

export default mixin;
