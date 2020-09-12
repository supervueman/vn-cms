<template>
  <v-list>
    <v-list-item to="/filesystem">
      <v-list-item-action>
        <v-icon color="primary">
          folder
        </v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          {{ d.filesystem || 'Filesystem' }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "FilesTab"
};
</script>
