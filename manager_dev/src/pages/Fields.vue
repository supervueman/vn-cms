<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-12.mt-2 Дополнительные поля
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/field-create"
            dark
            v-if="adminAccess"
          ) Создать  поле
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
                td.text-xs-right
                  v-btn(
                    text
                    fab
                    color="primary"
                    @click="removeDialogOpen(item)"
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
import { queryFields } from "@/query/field";

export default {
  name: "Fields",
  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        { text: "Шаблон", sortable: false },
        { text: "Тип", value: "fieldType", sortable: true },
        { text: "", sortable: false }
      ],
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 10,
      isRemoveDialog: false,
      removeItem: {}
    };
  },

  computed: {
    fields() {
      return this.$store.getters["field/getAll"];
    },
    count() {
      return this.$store.getters["field/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: queryFields(
        this.$route.query.offset || 0,
        this.$route.query.limit || this.limit
      )
    };
    await this.$store.dispatch("field/findAll", data);
    await this.$store.dispatch("field/count", data);
  },

  methods: {
    async getPage({ skip, limit }) {
      const data = {
        query: queryFields(offset, limit)
      };
      await this.$store.dispatch("field/findAll", data);
    },

    async remove() {
      await this.$store.dispatch("field/remove", this.removeItem.id);
      const fields = this.fields.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("field/setAll", fields);
    },

    removeDialogOpen(field) {
      this.removeItem = field;
      this.isRemoveDialog = true;
    }
  }
};
</script>
