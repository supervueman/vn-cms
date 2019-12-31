<template lang="pug">
  v-card(outlined)
    v-card-text.title.pt-4.px-4 {{d.remove_confirm || 'Are you sure you want to delete'}} {{name}}?
    v-card-actions.px-4.pt-0
      v-btn(depressed color="error" @click="remove") {{d.remove || 'Remove'}}
      v-btn(depressed color="primary" @click="cancel") {{d.cancel || 'Cancel'}}
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
