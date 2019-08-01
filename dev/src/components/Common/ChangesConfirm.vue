<template lang="pug">
  v-flex
    v-card
      v-card-title.title Вы действительно хотите сбросить изменения? Несохраненные данные будут утеряны.
      v-card-actions
        v-btn.ml-2(color="primary" @click="$emit('cancel')") Сбросить
        v-btn(color="primary" @click="$emit('close')") Отмена
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
