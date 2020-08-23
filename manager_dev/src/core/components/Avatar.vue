<template>
  <div
    class="avatar"
    @click="isActiveDialog = true"
  >
    <img
      :src="imagePath"
      alt="Avatar"
    >
    <VDialog v-model="isActiveDialog">
      <Filesystem @selectFile="selectFile" />
    </VDialog>
  </div>
</template>

<script>
// Config
import config from "../config";

// Components
import Filesystem from "@/core/components/Filesystem/Filesystem";

export default {
  name: "Avatar",

  components: {
    Filesystem
  },

  props: {
    imagePath: {
      type: String,
      default: `${config.staticFolderBasePath}/logo.png`
    }
  },

  data() {
    return {
      staticFolderBasePath: config.staticFolderBasePath,
      isActiveDialog: false
    };
  },

  methods: {
    selectFile(file) {
      this.$emit("selectFile", file.path);
    }
  }
};
</script>
