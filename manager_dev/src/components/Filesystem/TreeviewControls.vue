<template lang="pug">
  v-layout.justify-space-between
    div
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          v-icon.mr-2.storage-control(
            @click="$emit('openDialogForCreateFolder', true)"
            v-on="on"
          ) create_new_folder
        span {{d.create_directory}}
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          v-icon.mr-2.storage-control(
            v-on="on"
            @click="$emit('triggerForUploadFile')"
          ) vertical_align_top
        span {{d.download}}
      v-tooltip(top v-if="currentFileType")
        template(v-slot:activator="{ on }")
          a.file-download(:href="currentFilePath" download v-on="on")
            v-icon.storage-control vertical_align_bottom
        span {{d.upload}}
    div
      v-tooltip(top)
        template(v-slot:activator="{ on }")
          v-icon.storage-control(@click="$emit('filesystemReload')" v-on="on") replay
        span {{d.reload}}
</template>

<script>
export default {
  name: "TreeviewControls",

  props: {
    currentFileType: {
      type: String,
      default: null
    },
    currentFilePath: {
      type: String,
      default: ""
    }
  }
};
</script>
