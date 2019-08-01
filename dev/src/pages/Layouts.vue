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
          :rows-per-page-items="[5]"
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
            :itemsLength="layouts.length"
            @getPage="getPage"
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
  name: "Layouts",

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
      removeItem: {}
    };
  },

  computed: {
    layouts() {
      return this.$store.getters["layout/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("layout/fetchAll", {
      id: this.$route.params.id,
      skip: this.$route.query.skip,
      limit: this.$route.query.limit
    });
  },

  methods: {
    async getPage({ skip, limit }) {
      await this.$store.dispatch("user/fetchAll", {
        skip,
        limit
      });
    },

    remove() {
      this.$store.dispatch("layout/remove", this.removeItem.id);
    },

    removeDialogOpen(layout) {
      this.removeItem = layout;
      this.isRemoveDialog = true;
    }
  }
};
</script>
