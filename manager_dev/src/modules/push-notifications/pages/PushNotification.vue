<template lang="pug">
  v-flex
    v-flex.d-flex.justify-space-between.align-center.mb-12.mt-2
      .body-2 {{d.push_notifications || 'Push notifications'}}
      v-btn(
        v-if="isNotification"
        color="primary"
        depressed
        @click="askNotificationPermission"
      ) {{d.subscribe || 'Subscribe'}}
    v-layout
      v-flex.md7.mr-4
        v-card(outlined)
          v-card-text
            v-text-field(
              v-model="name"
              label="Name:"
            )
            v-select.mr-4(
              v-model="contextId"
              :items="contexts"
              label="Context"
              item-text="title"
              item-value="id"
            )
            v-text-field(
              v-model="title"
              label="Title:"
            )
            v-text-field(
              v-model="options.body"
              label="Body:"
            )
            v-layout
              v-flex.md6.mr-4
                div Icon
                image-field(
                  :path.sync="options.icon"
                  @selectFile="options.icon = $event"
                )
              v-flex.md6
                div Image
                image-field(
                  :path.sync="options.image"
                  @selectFile="options.image = $event"
                )
            v-flex.md6
              div Badge
              image-field(
                :path.sync="options.badge"
                @selectFile="options.badge = $event"
              )
            v-layout
              v-select.mr-4(
                v-model="options.dir"
                :items="['ltr', 'rtl', 'auto']"
                label="Dir:"
              )
              v-text-field(
                v-model="options.tag"
                label="Tag:"
                @input="options.tag === '' ? options.renotify = false : options.renotify = options.renotify"
              )
              v-checkbox(
                v-model="options.renotify"
                v-if="options.tag"
                color="primary"
                label="Renotify"
              )
            v-text-field(
              v-model="ttl"
              label="Time to life:"
              type="number"
            )
            v-text-field(
              v-model="options.click_action"
              label="Click action link:"
            )

          v-card-actions
            v-btn.ml-2.mr-2.mb-2(
              color="primary"
              depressed
              @click="displayConfirmNotification"
            ) {{d.send || 'Send'}}
            v-btn.mb-2.mr-2(
              v-if="id && r.is_push_notification_update"
              color="primary"
              depressed
              @click="saveNotification"
            ) {{d.save || 'Save'}}
            v-btn.mb-2.mr-2(
              v-if="r.is_push_notification_create"
              color="primary"
              depressed
              @click="createNotification"
            ) {{d.create_new || 'Create new'}}
            v-btn.mb-2(
              color="primary"
              depressed
              @click="clearNotification"
            ) {{d.clear || 'Clear'}}
      v-flex
        v-card(outlined)
          v-card-text
            v-flex.d-flex.justify-space-between.align-center.mb-8
              .title Actions
              v-btn(
                color="primary"
                depressed
                fab
                small
                @click="addAction"
              )
                v-icon add
            ActionItem(
              v-for="(item, i) in options.actions"
              :key="`action-${i}`"
              :item="item"
              @remove="removeAction(i)"
            )
    NotificationTemplates(
      @choose="setNotification"
    )
</template>

<script>
import ActionItem from '../components/ActionItem';
import NotificationTemplates from '../components/NotificationTemplates';
// Helpers
import urlBase64ToUnit8Array from '../helpers/urlBase64ToUnit8Array';

export default {
  name: 'PushNotificationPage',

  components: {
    ActionItem,
    NotificationTemplates
  },

  metaInfo() {
    return {
      title: `${this.d.push_notifications || 'Push notifications'}`
    };
  },

  data: () => ({
    id: null,
    isNotification: false,
    name: '',
    contextId: null,
    title: '',
    actionItem: {
      action: '',
      title: '',
      icon: ''
    },
    options: {
      body: '',
      icon: '',
      image: '',
      dir: 'ltr',
      lang: 'en-US',
      vibrate: [100, 50, 200],
      badge: '',
      tag: '',
      renotify: false,
      actions: [],
      click_action: ''
    },
    ttl: 3600
  }),

  computed: {
    contexts() {
      return this.$store.getters['context/getAll'];
    }
  },

  created() {
    this.$store.dispatch('context/findAll', {});
  },

  mounted() {
    if ('Notification' in window) {
      this.isNotification = true;
    }
  },

  methods: {
    actionsConfigure() {
      return this.options.actions.map((el) => {
        const action = {};
        if (el.action) action.action = el.action;
        if (el.title) action.title = el.title;
        if (el.icon)
          action.icon = `${process.env.VUE_APP_API_BASE_URL}/${el.icon}`;
        return action;
      });
    },

    optionsConfigure() {
      const options = {};

      const baseUrl = process.env.VUE_APP_API_BASE_URL;

      if (this.options.body !== '') options.body = this.options.body;

      if (this.options.icon !== '')
        options.icon = `${baseUrl}/${this.options.icon}`;

      if (this.options.image !== '')
        options.image = `${baseUrl}/${this.options.image}`;

      if (this.options.dir !== '') options.dir = this.options.dir;

      if (this.options.lang !== '') options.lang = this.options.lang;

      if (this.options.vibrate !== '') options.vibrate = this.options.vibrate;

      if (this.options.badge !== '') options.badge = this.options.badge;

      if (this.options.tag !== '') options.tag = this.options.tag;

      if (this.options.renotify) options.renotify = this.options.renotify;

      if (this.options.actions.length > 0)
        options.actions = this.actionsConfigure();

      if (this.options.click_action !== '')
        options.click_action = this.options.click_action;

      return options;
    },

    configurePushSub() {
      if (!('serviceWorker' in navigator)) {
        return;
      }
      let req;
      navigator.serviceWorker.ready
        .then((sw) => {
          req = sw;
          return sw.pushManager.getSubscription();
        })
        .then((sub) => {
          if (sub === null) {
            const vapidPublicKey = process.env.VUE_APP_VAPID_PUBLIC_KEY;
            const convertedVapidPublicKey = urlBase64ToUnit8Array(
              vapidPublicKey
            );

            return req.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidPublicKey
            });
          } else {
          }
        })
        .then((newSub) => {
          if (newSub) {
            return this.$store.dispatch('push-notifications/subscribe', {
              body: {
                endpoint: newSub.endpoint,
                subscribe: JSON.stringify(newSub)
              }
            });
          }
        })
        .then((res) => {
          this.displayConfirmNotification();
        })
        .catch(() => {
          console.log('Exist subscribe');
        });
    },

    async displayConfirmNotification() {
      await this.$store.dispatch('push-notifications/send', {
        body: {
          title: this.title,
          options: this.optionsConfigure(),
          ttl: this.ttl
        }
      });
    },

    askNotificationPermission() {
      Notification.requestPermission((result) => {
        if (result !== 'granted') {
          this.$store.dispatch('notification/fetch', {
            type: 'error',
            message: `${this.d.no_subscribe_to_push_notifications ||
              'No subscription to push notifications'}`,
            isActive: true
          });
        } else {
          this.configurePushSub();
        }
      });
    },

    addAction() {
      this.options.actions.push({ ...this.actionItem });
    },

    removeAction(i) {
      this.options.actions = this.options.actions.filter(
        (el, index) => i !== index
      );
    },

    setNotification(notification) {
      this.contextId = notification.contextId;
      this.name = notification.name;
      this.title = notification.title;
      this.id = notification.id;
      this.options = JSON.parse(notification.options);
      this.ttl = notification.ttl;
    },

    async saveNotification() {
      await this.$store.dispatch('push-notifications/update', {
        params: {
          id: this.id
        },
        body: {
          name: this.name,
          title: this.title,
          options: JSON.stringify(this.options),
          ttl: this.ttl,
          contextId: this.contextId
        }
      });
    },

    async createNotification() {
      await this.$store.dispatch('push-notifications/create', {
        body: {
          name: this.name,
          title: this.title,
          options: JSON.stringify(this.options),
          ttl: this.ttl,
          contextId: this.contextId
        }
      });
    },

    clearNotification() {
      this.id = null;
      this.name = '';
      this.title = '';
      this.options = {
        body: '',
        icon: '',
        image: '',
        dir: 'ltr',
        lang: 'en-US',
        vibrate: [100, 50, 200],
        badge: '',
        tag: '',
        renotify: false,
        actions: [],
        click_action: ''
      };
      this.ttl = 3600;
    }
  },

  beforeRouteLeave(from, to, next) {
    this.$store.dispatch('push-notifications/clearState');
    next();
  }
};
</script>

<style lang="sass" scoped>
.enable-notifications
  display: none
</style>
