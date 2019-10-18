<template lang="pug">
  v-flex(v-if="r.is_layouts_read")
    .body-2.mb-12.mt-2 {{d.layouts}}
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/layout-create"
            dark
            v-if="r.is_layout_create"
          ) {{d.create_layout}}
        v-data-table(
          :headers="headers"
          :items="layouts"
          :items-per-page-options="[limit]"
          hide-default-footer
        )
          template(v-slot:body="{items}")
            tbody
              tr(v-for="item in items" :key="item.id")
                td.text-xs-left
                  router-link(:to="`/layouts/${item.id}`") {{ item.title }}
                td.text-end
                  v-btn(
                    text
                    fab
                    color="primary"
                    @click="removeDialogOpen(item)"
                    v-if="r.is_layout_delete"
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
  name: "LayoutsPage",

  mixins: [accessMixin],

  metaInfo() {
    return {
      title: `${this.d.layouts || "Layouts"}`
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
          text: this.d.name,
          value: "title"
        },
        { text: "", sortable: false }
      ];
    },
    layouts() {
      return this.$store.getters["layout/getAll"];
    },
    count() {
      return this.$store.getters["layout/getCount"];
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
    await this.$store.dispatch("layout/findAll", data);
    await this.$store.dispatch("layout/count", data);
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
      await this.$store.dispatch("layout/findAll", data);
    },

    async remove() {
      if (!this.r.is_layout_delete) {
        return;
      }
      await this.$store.dispatch("layout/remove", {
        body: { id: this.removeItem.id }
      });
      const layouts = this.layouts.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("layout/setAll", layouts);
    },

    removeDialogOpen(layout) {
      this.removeItem = layout;
      this.isRemoveDialog = true;
    }
  }
};
</script>
