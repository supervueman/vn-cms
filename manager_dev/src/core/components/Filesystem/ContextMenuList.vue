<template>
  <v-list>
    <v-list-item
      v-if="!currentFile.type && r.is_filesystem_files_uploads"
      @click="$emit('triggerForUploadFile')"
    >
      <v-icon class="mr-2">
        vertical_align_top
      </v-icon>
      <div>
        {{ d.upload || 'Upload' }}
      </div>
    </v-list-item>

    <v-list-item
      v-if="currentFile.type"
    >
      <v-icon class="mr-2">
        vertical_align_bottom
      </v-icon>
      <a
        class="file-download"
        :href="currentFile.relativePath"
        download
      >
        {{ d.download || 'Downdload' }}
      </a>
    </v-list-item>
      
    <v-list-item
      v-if="!currentFile.type && r.is_filesystem_directory_create"
      @click="$emit('openDialogForCreateFolder', true)"
    >
      <v-icon class="mr-2">
        create_new_folder
      </v-icon>
      <div>
        {{ d.create_directory || 'Create directory' }}
      </div> 
    </v-list-item>
      
    <v-list-item
      v-if="r.is_filesystem_directory_delete"
      @click="$emit('openDialogForRemoveConfirm', true)"
    >
      <v-icon class="mr-2">
        delete
      </v-icon>
      <div>
        {{ d.remove || 'Remove' }}
      </div>
    </v-list-item>
  </v-list>
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
