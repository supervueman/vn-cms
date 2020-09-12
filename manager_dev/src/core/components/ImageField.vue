<template>
  <v-flex>
    <v-layout class="wrap">
      <v-flex class="md12">
        <v-layout class="align-center">
          <v-text-field
            :value="path"
            :label="label"
            @input="$emit('update:path', $event)"
          />
          <v-icon @click="isActiveDialog = true">
            image
          </v-icon>
        </v-layout>
      </v-flex>

      <v-flex
        v-if="path !== ''"
        class="md12"
      >
        <v-img
          :src="`/static/${path}`"
          max-width="100%"
        />
      </v-flex>
    </v-layout>

    <v-dialog v-model="isActiveDialog">
      <filesystem @selectFile="selectFile" />
      <v-card outlined>
        <v-card-actions>
          <v-btn
            class="ml-2"
            depressed
            @click="isActiveDialog = false"
          >
            {{ d.close || 'Close' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
// Components
import Filesystem from "@/core/components/Filesystem/Filesystem";

export default {
  name: "ImageField",

  components: {
    Filesystem
  },

  props: {
    path: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isActiveDialog: false,
      file: "",
      filePath: ""
    };
  },

  methods: {
    selectFile(file) {
      this.$emit("selectFile", file.path);
      this.$emit("input", file.path);
    }
  }
};
</script>
