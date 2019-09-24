<template lang="pug">
	v-flex
		v-card
			v-card-title.title {{d.remove_confirm}} {{name}}?
			v-card-actions
				v-btn.ml-2(color="error" @click="remove") {{d.remove}}
				v-btn(color="primary" @click="cancel") {{d.cancel}}
</template>

<script>
export default {
  name: "RemoveConfirm",

  props: {
    name: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    remove() {
      this.$emit("remove");
      this.$emit("update:isActive", false);
    },
    cancel() {
      this.$emit("update:isActive", false);
    }
  }
};
</script>
