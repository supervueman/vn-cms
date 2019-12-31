<template lang="pug">
  v-card(outlined)
    v-toolbar(flat color="white")
      v-spacer
      v-btn(
        color="primary"
        :to="`/resource-create?level=${resource.level}&parentId=${resource.id}&contextId=${resource.contextId}`"
        depressed
        v-if="r.is_resource_create && mainLang === resource.lang"
      ) {{d.create_resource || 'Создать ресурс'}}
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
                v-if="r.is_resource_delete" 
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
export default {
  name: "Resources",

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
        { text: `${this.d.name || "Наименование"}`, value: "title" },
        { text: `${this.d.slug || "Псевдоним"}`, value: "slug" },
        {
          text: `${this.d.date_creation || "Дата создания"}`,
          value: "createdAt"
        },
        { text: "", sortable: false }
      ];
    },
    resource() {
      return this.$store.getters["resource/get"];
    },
    resources() {
      return this.$store.getters["resource/getAll"];
    },
    count() {
      return this.$store.getters["resource/getCount"];
    }
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
              level: this.resource.level + 1,
              parentId: this.resource.id,
              lang: this.resource.lang
            }
          }
        }
      });
    },

    async remove() {
      if (this.r.is_resource_delete) {
        await this.$store.dispatch("resource/remove", {
          body: { id: this.removeItem.id }
        });
        const resources = this.resources.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("resource/setAll", resources);
      }
    },

    removeDialogOpen(resource) {
      this.removeItem = resource;
      this.isRemoveDialog = true;
    }
  }
};
</script>
