<template>
  <v-layout class="justify-space-between">
    <div>
      <v-tooltip
        v-if="r.is_filesystem_directory_create"
        top
      >
        <template v-slot:activator="{ on }">
          <v-icon
            class="mr-2 storage-control"
            @click="$emit('openDialogForCreateFolder', true)"
            v-on="on"
          >
            create_new_folder
          </v-icon>
        </template>
        <span>{{ d.create_directory || 'Create directory' }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="r.is_filesystem_files_uploads"
        top
      >
        <template v-slot:activator="{ on }">
          <v-icon
            class="mr-2 storage-control"
            v-on="on"
            @click="$emit('triggerForUploadFile')"
          >
            vertical_align_top
          </v-icon>
        </template>

        <span>{{ d.upload || 'Upload' }}</span>
      </v-tooltip>

      <v-tooltip
        v-if="currentFileType"
        top
      >
        <template v-slot:activator="{ on }">
          <a
            class="file-download"
            :href="currentFilePath"
            download
            v-on="on"
          >
            <v-icon class="storage-control">
              vertical_align_bottom
            </v-icon>
          </a>
        </template>

        <span>{{ d.download || 'Downdload' }}</span>
      </v-tooltip>
    </div>

    <div>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-icon
            class="storage-control"
            @click="$emit('filesystemReload')"
            v-on="on"
          >
            replay
          </v-icon>
        </template>

        <span>{{ d.reload || 'Reload' }}</span>
      </v-tooltip>
    </div>
  </v-layout>
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
