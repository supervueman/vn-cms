<template lang="pug">
  v-flex(v-if="r.is_context_read")
    .body-2.mb-12.mt-2 {{d.contexts || 'Contexts'}}
    v-card(outlined)
      v-toolbar(flat color="white")
        v-spacer
        v-btn(
          depressed
          color="primary"
          to="/context-create"
          dark
          v-if="r.is_context_create"
        ) {{d.create_context || 'Create context'}}
      v-data-table(
        :headers="headers"
        :items="contexts"
        :items-per-page-options="[limit]"
        hide-default-footer
      )
        template(v-slot:body="{items}")
          tbody
            tr(v-for="item in items" :key="item.id")
              td.text-xs-left
                router-link(:to="`/contexts/${item.id}`") {{ item.slug }}
              td.text-xs-left
                router-link(:to="`/contexts/${item.id}`") {{ item.title }}
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="removeDialogOpen(item)"
                  v-if="r.is_context_delete && item.slug !== 'root'"
                )
                  v-icon delete
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
  name: "ContextsPage",

  metaInfo() {
    return {
      title: `${this.d.contexts || "Contexts"}`
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
          text: `${this.d.slug || "Slug"}`,
          value: "slug"
        },
        {
          text: `${this.d.name || "Name"}`,
          value: "title"
        },
        { text: "", sortable: false }
      ];
    },
    contexts() {
      return this.$store.getters["context/getAll"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          order: [["createdAt", "DESC"]]
        }
      }
    };
    await this.$store.dispatch("context/findAll", data);
    await this.$store.dispatch("context/count", data);
  },

  methods: {
    async remove() {
      if (this.r.is_context_delete) {
        await this.$store.dispatch("context/remove", {
          params: { id: this.removeItem.id }
        });
        // Создаем новый массив без удаленного элемента
        const contexts = this.contexts.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });

        this.$store.dispatch("context/setAll", contexts);
      }
    },

    removeDialogOpen(context) {
      this.removeItem = context;
      this.isRemoveDialog = true;
    }
  }
};
</script>
