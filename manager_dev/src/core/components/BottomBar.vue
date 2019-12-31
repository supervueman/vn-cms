<template lang="pug">
  v-footer(
    padless
    color="primary"
    absolute
    app
  )
    v-card(
      flat
      tile
      width="100%"
      class="primary"
    )
      v-card-text.white--text
        v-layout(justify-space-between)
          div {{ new Date().getFullYear() }} VN-CMS
          div {{d.developer || 'Разработчик'}}
            a.dev-link(href="https://www.facebook.com/rdavlikamov" target="_blank") SUPERVUEMAN
</template>

<script>
export default {};
</script>

<style lang="sass">
.dev-link
  color: #fff!important
  margin-left: 5px
  font-weight: bold
  border: none
  text-decoration: none
  letter-spacing: 2px
  position: relative
  &::after
    content: ''
    position: absolute
    bottom: 0
    left: 0
    width: 0
    height: 1px
    background-color: #fff
    transition: 0.5s
  &:hover
    &::after
      width: 100%
</style>
