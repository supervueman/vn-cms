<template lang="pug">
  v-card.pt-3.mb-3(outlined)
    v-card-text.py-0.justify-center.d-flex
      v-layout.justify-center
        v-avatar(size="150" color="#fff" class="avatar")
          img(:src="`/static/${profile.image}`")
          .avatar-mask(@click="isActiveDialog = true")
            v-icon(color="#fff") add_circle_outline
    v-card-text.text-md-center.justify-center.mt-4.pb-0 {{d.avatar || 'Avatar'}}
    v-card-title.title.font-weight-bold.text-md-center.justify-center {{profile.lastname}} {{profile.firstname}}

    v-dialog(v-model="isActiveDialog")
      filesystem(@selectFile="selectFile")
</template>

<script>
import Filesystem from "@/core/components/Filesystem/Filesystem";

export default {
  name: "ProfileAvatarData",

  components: {
    Filesystem
  },

  props: {
    profile: {
      type: Object,
      default: () => {}
    }
  },

  data: () => {
    return {
      isActiveDialog: false
    };
  },

  methods: {
    async selectFile(file) {
      if (this.r.is_user_update) {
        this.profile.image = file.path;
        const data = {
          params: {
            id: this.profile.id
          },
          body: {
            image: file.path
          },
          query: {
            filter: {
              include: ["role", "context"]
            }
          }
        };
        await this.$store.dispatch("user/update", data);
      }
    }
  }
};
</script>

<style lang="sass">
.avatar
	margin: auto
	overflow: hidden
	.avatar-mask
		position: absolute
		bottom: 0
		left: 0
		width: 100%
		height: 50px
		background-color: rgba(#062745, 0.9)
		transition: transform 0.5s
		transform: translateY(100%)
		cursor: pointer
		display: flex
		justify-content: center
		align-items: center
	&:hover
		.avatar-mask
			transform: translateY(0)
</style>
