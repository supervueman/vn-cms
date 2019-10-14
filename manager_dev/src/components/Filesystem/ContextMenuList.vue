<template lang="pug">
	v-list
		v-list-item(
			v-if="!currentFile.type && r.is_filesystem_files_uploads"
			@click="$emit('triggerForUploadFile')"
		)
			v-icon.mr-2 vertical_align_top
			div {{d.upload}}
		v-list-item(
			v-if="currentFile.type"
		)
			v-icon.mr-2 vertical_align_bottom
			a.file-download(:href="currentFile.relativePath" download) {{d.download}}
		v-list-item(
			v-if="!currentFile.type && r.is_filesystem_directory_create"
			@click="$emit('openDialogForCreateFolder', true)"
		)
			v-icon.mr-2 create_new_folder
			div {{d.create_directory}}
		v-list-item(
			@click="$emit('openDialogForRemoveConfirm', true)"
			v-if="r.is_filesystem_directory_delete"
		)
			v-icon.mr-2 delete
			div {{d.remove}}
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
