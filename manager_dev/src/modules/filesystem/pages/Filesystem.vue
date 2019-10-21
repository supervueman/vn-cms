<template lang="pug">
	v-flex(v-if="r.is_filesystem_access")
		v-layout.justify-space-between.align-center.mb-5
			.body-2.mt-2.mb-12 {{d.filesystem}}
		filesystem
</template>

<script>
import Filesystem from "@/components/Filesystem/Filesystem";

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
