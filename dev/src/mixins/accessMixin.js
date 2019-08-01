const mixin = {
  computed: {
    adminAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role === 'admin' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    managerAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role === 'manager' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    userAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role === 'user' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    }
  }
}

export default mixin;
