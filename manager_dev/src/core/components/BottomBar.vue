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
          div {{ new Date().getFullYear() }} — Platform
          div Разработка
            a.dev-link(href="https://multikey.studio/" target="_blank") MULTIKEY
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
</style>
