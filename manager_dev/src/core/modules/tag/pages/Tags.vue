<template lang="pug">
  v-flex(v-if="r.is_layout_read")
    .body-2.mb-12.mt-2 {{d.tags || 'Tags'}}
    v-card(outlined)
      tags-toolbar
      v-data-table(
        :headers="headers"
        :items="tags"
        :items-per-page-options="[limit]"
        hide-default-footer
      )
        template(v-slot:body="{items}")
          tbody
            tr(v-for="item in items" :key="item.id")
              td.text-xs-left
                router-link(:to="`/tags/${item.id}`") {{ item.title }} ({{item.id}})
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="removeItem = item; isRemoveDialog = true"
                  v-if="r.is_layout_delete"
                )
                  v-icon delete
      v-card-actions.text-xs-center.pt-2
        pagination(
          :itemsLength="count"
          @getPage="getPage"
          :limit="limit"
        )
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500px"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        :name="removeItem.title"
      )
</template>

<script>
// Components
import TagsToolbar from "../components/TagsToolbar";

export default {
  name: "TagsPage",

  components: {
    TagsToolbar
  },

  metaInfo() {
    return {
      title: `${this.d.tags || "Tags"}`
    };
  },

  data() {
    return {
      isRemoveDialog: false,
      removeItem: {},
      limit: 10
    };
  },

  computed: {
    headers() {
      return [
        {
          text: `${this.d.name || "Name"}`,
          value: "title"
        },
        { text: "", sortable: false }
      ];
    },
    tags() {
      return this.$store.getters["tag/getAll"];
    },
    count() {
      return this.$store.getters["tag/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]]
        }
      }
    };
    await this.$store.dispatch("tag/findAll", data);
    await this.$store.dispatch("tag/count", {});
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]]
          }
        }
      };
      await this.$store.dispatch("tag/findAll", data);
    },

    async remove() {
      if (this.r.is_layout_delete) {
        await this.$store.dispatch("tag/remove", {
          params: { id: this.removeItem.id }
        });
        const tags = this.tags.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("tag/setAll", tags);
      }
    }
  }
};
</script>
