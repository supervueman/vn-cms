<template lang="pug">
  div(
    class="notification"
    :class="{'notification-error': type === 'error', 'notification-success': type === 'success', 'notification-warning': type === 'warning'}"
  ) {{message}}
</template>

<script>
export default {
  name: "Notification",

  props: {
    type: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="sass">
.notification
  position: fixed
  top: 20px
  right: 20px
  width: 300px
  padding: 20px
  z-index: 9999
  color: #fff
  transition: 0.2s
  border-radius: 2px
  font-size: 16px
  font-family: sans-serif
  pointer-events: none
.notification-error
  background-color: #E3483F!important
.notification-success
  background-color: #67CC86!important
.notification-warn
  background-color: #FEB648!important
</style>
