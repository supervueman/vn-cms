const mixin = {
  computed: {
    adminAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role.slug === 'admin' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    managerAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role.slug === 'manager' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    courierAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role.slug === 'courier' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    },
    userAccess() {
      const profile = this.$store.getters['profile/get'];
      const bool = profile.role.slug === 'user' && profile.id !== '' && profile.id !== undefined;

      if (bool) return true;
      return false;
    }
  }
}

export default mixin;
