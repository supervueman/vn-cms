<template>
  <v-card outlined>
    <v-card-text>
      <v-select
        v-model="tag"
        :items="tags"
        :label="d.select_tag || 'Select tag'"
        item-text="title"
        item-value="id"
        @change="selectTag"
      />
    </v-card-text>

    <v-card-text>
      <v-layout>
        <v-chip
          v-for="tag in resource.tags"
          :key="tag.slug"
          class="mr-1"
          close
          color="primary"
          close-icon="mdi-delete"
          @click:close="removeTag(tag.id)"
        >
          {{ tag.title }}
        </v-chip>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ResourceTagsConpponent",

  data: () => ({
    tag: null
  }),

  computed: {
    tags() {
      return this.$store.getters["tag/getAll"];
    },

    resource() {
      return this.$store.getters["resource/get"];
    }
  },

  methods: {
    async selectTag(id) {
      const tag = this.tags.find(el => el.id === id);
      if (!this.resource.tags.find(el => el.id === tag.id)) {
        this.resource.tags.push(this.tags.find(el => el.id === id));

        await this.$store.dispatch("resource/addTag", {
          body: [[this.resource.id, id]]
        });
      }
    },

    async removeTag(id) {
      const tag = this.tags.find(el => el.id === id);
      if (tag) {
        this.resource.tags = this.resource.tags.filter(el => el.id !== id);
        await this.$store.dispatch("resource/removeTag", {
          body: [[this.resource.id, id]]
        });
      }
    }
  }
};
</script>
