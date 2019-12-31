<template lang="pug">
	v-flex
		v-layout
			v-flex.md7
				h1.mb-4 Hello {{profile.firstname}}!
				h3 VN-CMS use Node js (Express js) for the server side and Vue js for the client side. VN-CMS is also based on Rest API architecture for flexible request and data control.
</template>

<script>
export default {
	name: 'IndexPage',

	computed: {
		profile() {
			return this.$store.getters['profile/get'];
		}
	}
};
</script>
