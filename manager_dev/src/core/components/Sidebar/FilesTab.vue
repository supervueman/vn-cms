<template lang="pug">
	v-list
		v-list-item(to="/filesystem")
			v-list-item-action
				v-icon(color="primary") folder
			v-list-item-content
				v-list-item-title {{d.filesystem || 'Файловая система'}}
</template>

<script>
export default {
	name: 'FilesTab'
};
</script>
