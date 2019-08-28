<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Шаблоны
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/layout-create"
            dark
            v-if="adminAccess"
          ) Создать шаблон
        v-data-table(
          :headers="headers"
          :items="layouts"
          :rows-per-page-items="[limit]"
          hide-actions
        )
          template(v-slot:items="props")
            td.text-xs-left
              router-link(:to="`/layouts/${props.item.id}`") {{ props.item.title }}
            td.text-xs-right
              v-btn(
                flat
                fab
                color="primary"
                @click="removeDialogOpen(props.item)"
                v-if="adminAccess"
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
import { queryLayouts } from "@/query/layout";

export default {
  name: "LayoutsPage",

  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        { text: "", sortable: false }
      ],
      isRemoveDialog: false,
      removeItem: {},
      limit: 10
    };
  },

  computed: {
    layouts() {
      return this.$store.getters["layout/getAll"];
    },
    count() {
      return this.$store.getters["layout/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: queryLayouts(
        this.$route.query.offset || 0,
        this.$route.query.limit || this.limit
      )
    };
    await this.$store.dispatch("layout/findAll", data);
    await this.$store.dispatch("layout/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      await this.$store.dispatch("layout/findAll", {
        filter: {
          offset,
          limit,
          order: [["createdAt", "DESC"]]
        }
      });
    },

    async remove() {
      await this.$store.dispatch("layout/remove", this.removeItem.id);
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
