<template lang="pug">
  v-flex.md6
    v-layout.wrap
      v-flex.md12
        v-layout.align-center
          v-text-field(
            @input="$emit('update:path', $event)"
            :value="path"
          )
          v-icon(@click="isActiveDialog = true") image
      v-flex.md12(v-if="path !== ''")
        v-img(:src="`/static/${path}`", alt="alt" max-width="100%")
    v-dialog(v-model="isActiveDialog")
      filesystem(@selectFile="selectFile")
      v-card
        v-card-actions
          v-btn.ml-2(@click="isActiveDialog = false") Закрыть
</template>

<script>
// Components
import Filesystem from "@/components/Filesystem/Filesystem";

// Config
import { imgFolderBasePath } from "@/config";

export default {
  name: "ImageField",

  components: {
    Filesystem
  },

  props: {
    path: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isActiveDialog: false,
      file: "",
      filePath: "",
      imgFolderBasePath
    };
  },

  methods: {
    selectFile(file) {
      console.log(file);
      this.$emit("selectFile", file.path);
    }
  }
};
</script>
