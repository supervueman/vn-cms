<template lang="pug">
  v-layout.wrap
    v-flex
      v-toolbar(flat color="white")
        v-spacer
        v-btn(
          color="primary"
          :to="`/resource-create?level=${level}&parentId=${parentId}`"
          dark
          v-if="managerAccess && mainLang === lang"
        ) {{d.create_resource}}
      v-data-table(
        :headers="headers"
        :items="resources"
        :items-per-page-options="[limit]"
        hide-default-footer
      )
        template(v-slot:body="{items}")
          tbody
            tr(v-for="item in items" :key="item.id")
              td.text-xs-left
                router-link(
                  :to="`/resources/${item.id}`"
                ) {{ item.title }} ({{item.id}})
              td.text-xs-left {{item.slug}}
              td.text-xs-left {{item.createdAt}}
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="removeDialogOpen(item)"
                  v-if="managerAccess || adminAccess" 
                )
                  v-icon delete
      div.text-xs-center.pt-2
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
// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "Resources",

  mixins: [accessMixin],

  props: {
    parentId: {
      type: Number,
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    lang: {
      type: String,
      default: ""
    }
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
        { text: this.d.name, value: "title" },
        { text: this.d.slug, value: "slug" },
        { text: this.d.date_creation, value: "createdAt" },
        { text: "", sortable: false }
      ];
    },
    resources() {
      return this.$store.getters["resource/getAll"];
    },
    count() {
      return this.$store.getters["resource/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]],
          where: {
            level: this.level + 1,
            parentId: this.$route.params.id,
            lang: this.$store.getters["base/getMainLang"]
          }
        }
      }
    };
    await this.$store.dispatch("resource/findAll", data);
    await this.$store.dispatch("resource/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      await this.$store.dispatch("resource/findAll", {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            where: {
              level: this.level + 1,
              parentId: this.$route.params.id
            }
          }
        }
      });
    },

    async remove() {
      await this.$store.dispatch("resource/remove", {
        body: { id: this.removeItem.id }
      });
      const resources = this.resources.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      const profileResources = this.$store.getters[
        "profile/getResources"
      ].filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("resource/setAll", resources);
      this.$store.dispatch("profile/setResources", profileResources);
    },

    removeDialogOpen(resource) {
      this.removeItem = resource;
      this.isRemoveDialog = true;
    }
  }
};
</script>
