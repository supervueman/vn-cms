<template lang="pug">
  v-flex(v-if="r.is_field_categories_read")
    .body-2.mb-12.mt-2 {{d.field_categories}}
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/fieldcategory-create"
            dark
            v-if="r.is_field_category_create"
          ) {{d.create_field_category}}
        v-data-table(
          :headers="headers"
          :items="fields"
          :items-per-page-options="[limit]"
          hide-default-footer
        )
          template(v-slot:body="{items}")
            tbody
              tr(v-for="item in items" :key="item.id")
                td.text-xs-left
                  router-link(:to="`/fieldcategories/${item.id}`") {{ item.title }}
                td.text-end
                  v-btn(
                    text
                    fab
                    color="primary"
                    @click="removeDialogOpen(item)"
                    v-if="r.is_field_category_delete"
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
  name: "Fields",
  mixins: [accessMixin],

  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 10,
      isRemoveDialog: false,
      removeItem: {}
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
    fields() {
      return this.$store.getters["fieldCategory/getAll"];
    },
    count() {
      return this.$store.getters["fieldCategory/getCount"];
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
    await this.$store.dispatch("fieldCategory/findAll", data);
    await this.$store.dispatch("fieldCategory/count", data);
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
      await this.$store.dispatch("fieldCategory/findAll", data);
    },

    async remove() {
      if (!this.r.is_field_delete) {
        return;
      }
      await this.$store.dispatch("fieldCategory/remove", {
        body: { id: this.removeItem.id }
      });
      const fields = this.fields.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("fieldCategory/setAll", fields);
    },

    removeDialogOpen(fieldCategory) {
      this.removeItem = fieldCategory;
      this.isRemoveDialog = true;
    }
  }
};
</script>
