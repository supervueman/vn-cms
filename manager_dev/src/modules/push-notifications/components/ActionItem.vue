<template lang="pug">
	v-flex
		v-layout.align-center
			v-text-field(
				v-model="item.action"
				label="Action:"
			)
			v-btn(
				color="error"
				fab
				small
				depressed
				@click="$emit('remove')"
			)
				v-icon delete
		v-text-field(
			v-model="item.title"
			label="Title:"
		)
		v-layout
			v-flex.md6
				div Icon
				image-field(
					:path.sync="item.icon"
					@selectFile="item.icon = $event"
				)
</template>

<script>
export default {
  name: 'ActionItem',

  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
