<template lang="pug">
	v-flex
		v-layout.justify-space-between.align-center.mb-5
			.body-2 Filesystem
		filesystem
</template>

<script>
import Filesystem from "@/components/Filesystem/Filesystem";

export default {
  name: "FilesystemPage",

  components: {
    Filesystem
  }
};
</script>
