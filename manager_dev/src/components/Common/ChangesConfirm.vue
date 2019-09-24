<template lang="pug">
  v-flex
    v-card
      v-card-title.title {{d.cancel_confirm}}
      v-card-actions
        v-btn.ml-2(color="primary" @click="$emit('cancel')") {{d.cancel}}
        v-btn(color="primary" @click="$emit('close')") {{d.close}}
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
