<template lang="pug">
  div.avatar
    img(:src="imagePath", alt="Avatar")
</template>

<script>
import config from "@/config";
export default {
  name: "Avatar",

  props: {
    imagePath: {
      type: String,
      default: `${config.staticFolderBasePath}/logo.png`
    }
  },

  data() {
    return {
      staticFolderBasePath: config.staticFolderBasePath
    };
  }
};
</script>
