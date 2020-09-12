<template>
  <v-flex>
    <v-card>
      <v-card-title class="title">
        {{ d.cancel_confirm }}
      </v-card-title>

      <v-card-actions>
        <v-btn
          class="ml-2"
          color="primary"
          @click="$emit('cancel')"
        >
          {{ d.cancel || 'Cancel' }}
        </v-btn>
        <v-btn
          color="primary"
          @click="$emit('close')"
        >
          {{ d.close || 'Close' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "ChangesConfirm",

  props: {
    isChanged: {
      type: Boolean,
      default: false
    }
  }
};
</script>
