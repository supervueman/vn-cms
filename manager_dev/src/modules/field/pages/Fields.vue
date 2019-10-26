<template lang="pug">
  v-flex(v-if="r.is_fields_read")
    .body-2.mb-12.mt-2 {{d.additional_fields}}
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-flex.md4.mr-4
            v-select(
              :items="fieldCategories"
              item-text="title"
              item-value="id"
              hide-details
              clearable
              :label="`${d.field_category}:`"
              @change="filterFields($event)"
            )
          v-btn(
            color="primary"
            to="/field-create"
            dark
            v-if="r.is_field_create"
          ) {{d.create_field}}
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
                  router-link(:to="`/fields/${item.id}`") {{ item.title }}
                td.text-xs-left 
                  div(
                    v-for="layout in item.layouts"
                    :key="layout.id"
                  )
                    router-link(
                      :to="`/layouts/${layout.id}`"
                    ) {{layout.title}}
                td.text-xs-left {{item.fieldType}}
                td.text-end
                  v-btn(
                    text
                    fab
                    color="primary"
                    @click="removeDialogOpen(item)"
                    v-if="r.is_field_delete"
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
export default {
  name: "Fields",

  metaInfo() {
    return {
      title: `${this.d.fields || "Fields"}`
    };
  },

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
        { text: this.d.layout, sortable: false },
        { text: this.d.type, value: "fieldType", sortable: true },
        { text: "", sortable: false }
      ];
    },
    fields() {
      return this.$store.getters["field/getAll"];
    },
    count() {
      return this.$store.getters["field/getCount"];
    },

    fieldCategories() {
      return this.$store.getters["fieldcategory/getAll"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]],
          include: ["layouts"]
        }
      }
    };
    await this.$store.dispatch("field/findAll", data);
    await this.$store.dispatch("field/count", data);

    await this.$store.dispatch("fieldcategory/findAll", {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    });
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: ["layouts"]
          }
        }
      };
      await this.$store.dispatch("field/findAll", data);
    },

    async remove() {
      if (!this.r.is_field_delete) {
        return;
      }
      await this.$store.dispatch("field/remove", {
        body: { id: this.removeItem.id }
      });
      const fields = this.fields.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("field/setAll", fields);
    },

    async filterFields(event) {
      await this.$store.dispatch("field/findAll", {
        query: {
          filter: {
            order: [["createdAt", "DESC"]],
            where: { categoryId: event },
            include: ["layouts"]
          }
        }
      });
    },

    removeDialogOpen(field) {
      this.removeItem = field;
      this.isRemoveDialog = true;
    }
  }
};
</script>
