<template lang="pug">
  v-flex
    v-card
      v-card-title.title {{d.cancel_confirm}}
      v-card-actions
        v-btn.ml-2(color="primary" @click="$emit('cancel')") {{d.cancel || 'Cancel'}}
        v-btn(color="primary" @click="$emit('close')") {{d.close || 'Close'}}
</template>

<script>
export default {
  name: "ChangesConfirm",

  props: {
    isChanged: {
      type: Boolean,
      default: false
    }
  }
};
</script>
