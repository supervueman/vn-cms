<template lang="pug">
  v-layout(column)
    v-flex(v-for="(elem, key, i) in item" :key="i")
      v-flex(v-if="elem.type === 'text'")
        v-text-field(
          v-model="elem.value"
          :label="elem.title"
        )
      v-flex(v-if="elem.type === 'textarea'")
        v-textarea(
          v-model="elem.value"
          :label="elem.title"
        )
      v-flex(v-if="elem.type === 'colorpicker'")
        div {{elem.title}}
        v-color-picker(
          v-model="elem.value"
        )
</template>

<script>
export default {
  name: "OrderDeliveryComponent",
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
