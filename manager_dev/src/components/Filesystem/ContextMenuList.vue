<template lang="pug">
  v-list
    v-list-tile(
      v-if="!currentFile.type"
      @click="$emit('triggerForUploadFile')"
    )
      v-icon.mr-2 vertical_align_top
      div Загрузить файл
    v-list-tile(
      v-if="currentFile.type"
    )
      v-icon.mr-2 vertical_align_bottom
      a.file-download(:href="currentFile.relativePath" download) Скачать файл
    v-list-tile(
      v-if="!currentFile.type"
      @click="$emit('openDialogForCreateFolder', true)"
    )
      v-icon.mr-2 create_new_folder
      div Создать папку
    v-list-tile(@click="$emit('openDialogForRemoveConfirm', true)")
      v-icon.mr-2 delete
      div Удалить
</template>

<script>
export default {
  name: "ContextMenuList",

  props: {
    currentFile: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
