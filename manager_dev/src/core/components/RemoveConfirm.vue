<template>
  <v-card outlined>
    <v-card-text class="title pt-4 px-4">
      {{ d.remove_confirm || 'Are you sure you want to delete' }} {{ name }}?
    </v-card-text>

    <v-card-actions class="px-4 pt-0">
      <v-btn
        depressed
        color="error"
        @click="remove"
      >
        {{ d.remove || 'Remove' }}
      </v-btn>
      <v-btn
        depressed
        color="primary"
        @click="cancel"
      >
        {{ d.cancel || 'Cancel' }}
      </v-btn>
    </v-card-actions>
  </v-card>
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
