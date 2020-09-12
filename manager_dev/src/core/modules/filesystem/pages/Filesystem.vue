<template>
  <v-flex v-if="r.is_filesystem_access">
    <v-layout class="justify-space-between align-center mb-5">
      <div class="body-2 mt-2 mb-12">
        {{ d.filesystem || 'Filesystem' }}
      </div>
    </v-layout>
    <filesystem />
  </v-flex>
</template>

<script>
import Filesystem from "@/core/components/Filesystem/Filesystem";

export default {
  name: "FilesystemPage",

  metaInfo() {
    return {
      title: `${this.d.filesystem || "Filesystem"}`
    };
  },

  components: {
    Filesystem
  }
};
</script>
