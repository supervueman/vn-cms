<template lang="pug">
  v-flex(v-if="r.is_field_read")
    .body-2.mb-12.mt-2 {{d.fields || 'Поля'}}
    v-card(outlined)
      fields-toolbar(
        @filter="filterFields($event)"
      )
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
import FieldsToolbar from "../components/FieldsToolbar";

export default {
  name: "FieldsPage",

  components: {
    FieldsToolbar
  },

  metaInfo() {
    return {
      title: `${this.d.fields || "Поля"}`
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
          text: `${this.d.name || "Наименование"}`,
          value: "title"
        },
        { text: `${this.d.layouts || "Шаблоны"}`, sortable: false },
        {
          text: `${this.d.type_type || "Тип поля"}`,
          value: "fieldType",
          sortable: true
        },
        { text: "", sortable: false }
      ];
    },
    fields() {
      return this.$store.getters["field/getAll"];
    },
    count() {
      return this.$store.getters["field/getCount"];
    }
  },

  async mounted() {
    const where = {};
    if (
      this.$route.query.categoryId &&
      this.$route.query.categoryId !== "undefined"
    ) {
      where.categoryId = this.$route.query.categoryId;
    }
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]],
          include: ["layouts"],
          where
        }
      }
    };
    await this.$store.dispatch("field/findAll", data);
    await this.$store.dispatch("field/count", {});
  },

  methods: {
    async getPage({ offset, limit }) {
      const where = {};
      if (
        this.$route.query.categoryId &&
        this.$route.query.categoryId !== "undefined"
      ) {
        where.categoryId = this.$route.query.categoryId;
      }

      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            include: ["layouts"],
            where
          }
        }
      };
      await this.$store.dispatch("field/findAll", data);
    },

    async remove() {
      if (this.r.is_field_delete) {
        const layouts = this.removeItem.layouts.map(el => el.id);

        await this.$store.dispatch("field/removeLayout", {
          body: {
            id: this.removeItem.id,
            layouts
          }
        });

        await this.$store.dispatch("field/remove", {
          params: { id: this.removeItem.id }
        });

        const fields = this.fields.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("field/setAll", fields);
      }
    },

    async filterFields(event) {
      this.$router.push(
        `/fields?offset=${this.$route.query.offset || 0}&limit=${this.$route
          .query.limit || this.limit}&categoryId=${event}`
      );
      await this.$store.dispatch("field/findAll", {
        query: {
          filter: {
            offset: this.$route.query.offset || 0,
            limit: this.$route.query.limit || this.limit,
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
