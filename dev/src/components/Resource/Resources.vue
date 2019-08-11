<template lang="pug">
  v-layout.wrap
    v-flex
      v-toolbar(flat color="white")
        v-spacer
        v-btn(
          color="primary"
          to="/resource-create"
          dark
          v-if="managerAccess"
        ) Создать ресурс
      v-data-table(
        :headers="headers"
        :items="resources"
        :rows-per-page-items="[5]"
        hide-actions
      )
        template(v-slot:items="props")
          td.text-xs-left
            router-link(
              :to="`/resources/${props.item.id}`"
            ) {{ props.item.title }} ({{props.item.id}})
          td.text-xs-left {{props.item.slug}}
          td.text-xs-left {{props.item.createdAt}}
          td.text-xs-right
            v-btn(
              flat
              fab
              color="primary"
              @click="removeDialogOpen(props.item)"
              v-if="managerAccess || adminAccess" 
            )
              v-icon delete
      div.text-xs-center.pt-2
        pagination(
          :itemsLength="count"
          @getPage="getPage"
          :limit="5"
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
  name: "ResourcesPage",

  mixins: [accessMixin],

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
      limit: 5
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
    await this.$store.dispatch("resource/findAll", {
      filter: {
        offset: this.$route.query.offset || 0,
        limit: this.$route.query.limit || this.limit
      }
    });
  },

  methods: {
    async getPage({ offset, limit }) {
      await this.$store.dispatch("resource/findAll", {
        filter: {
          offset,
          limit
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
      this.$store.dispatch("resource/setAll", resources);
    },

    removeDialogOpen(resource) {
      this.removeItem = resource;
      this.isRemoveDialog = true;
    }
  }
};
</script>
