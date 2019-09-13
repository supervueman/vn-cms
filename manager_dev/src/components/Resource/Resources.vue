<template lang="pug">
  v-layout.wrap
    v-flex
      v-toolbar(flat color="white")
        v-spacer
        v-btn(
          color="primary"
          :to="`/resource-create?level=${level}&parentId=${parentId}`"
          dark
          v-if="managerAccess"
        ) Создать ресурс
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

// Query
import { queryResources } from "@/query/resource";

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
    }
  },

  data() {
    return {
      headers: [
        { text: "Наименование", value: "title" },
        { text: "Псевдоним", value: "slug" },
        { text: "Дата создания", value: "createdAt" },
        { text: "", sortable: false }
      ],
      isRemoveDialog: false,
      removeItem: {},
      limit: 10
    };
  },

  computed: {
    resources() {
      return this.$store.getters["resource/getAll"];
    },
    count() {
      return this.$store.getters["resource/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: queryResources(
        this.$route.query.offset || 0,
        this.$route.query.limit || this.limit,
        {
          level: this.level + 1,
          parentId: this.$route.params.id
        }
      )
    };
    await this.$store.dispatch("resource/findAll", data);
    await this.$store.dispatch("resource/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      await this.$store.dispatch("resource/findAll", {
        filter: {
          offset,
          limit,
          order: [["createdAt", "DESC"]],
          where: {
            level: this.level + 1,
            parentId: this.$route.params.id
          }
        }
      });
    },

    async remove() {
      await this.$store.dispatch("resource/remove", this.removeItem.id);
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
