<template lang="pug">
	v-card.mt-8(
		v-if="notificationTemplates.length > 0"
		outlined
	)
		v-card-text
			v-layout.align-center.justify-space-between
				div Templates
				v-btn(
					fab
					small
					color="primary"
					depressed
					@click="reload"
				)
					v-icon replay
		v-card-text.pb-1
			v-layout.justify-space-between.mb-4(
				v-for="(notification, i) in notificationTemplates"
				:key="i"
			)
				.title {{notification.name}}
				div
					v-btn.mr-3(
						color="primary"
						depressed
						@click="$emit('choose', notification)"
					) {{d.choose || 'Choose'}}
					v-icon(
						v-if="r.is_push_notification_delete"
						@click="remove(notification.id)"
					) delete
</template>

<script>
export default {
  name: 'NotificationsTemplates',

  computed: {
    notificationTemplates() {
      return this.$store.getters['push-notifications/getAll'];
    }
  },

  async created() {
    await this.$store.dispatch('push-notifications/findAll', {});
  },

  methods: {
    async remove(id) {
      if (this.r.is_push_notification_delete) {
        await this.$store.dispatch('push-notifications/remove', {
          params: {
            id
          }
        });
        const notificationTemplates = this.notificationTemplates.filter(
          (el) => {
            if (el.id !== id) {
              return el;
            }
          }
        );
        this.$store.dispatch(
          'push-notifications/setAll',
          notificationTemplates
        );
      }
    },
    async reload() {
      await this.$store.dispatch('push-notifications/findAll', {});
    }
  }
};
</script>
