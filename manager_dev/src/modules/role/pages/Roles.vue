<template lang="pug">
  v-flex(v-if="r.is_role_read")
    .body-2.mb-12.mt-2 {{d.roles || 'Роли'}}
    v-card(outlined)
      v-toolbar(flat color="white")
        v-spacer
        v-btn(
          depressed
          color="primary"
          to="/role-create"
          dark
          v-if="r.is_role_create"
        ) {{d.create_role || 'Создать роль'}}
      v-data-table(
        :headers="headers"
        :items="roles"
        :items-per-page-options="[limit]"
        hide-default-footer
      )
        template(v-slot:body="{items}")
          tbody
            tr(v-for="item in items" :key="item.id")
              td.text-xs-left
                router-link(:to="`/roles/${item.id}`") {{ item.title }}
              td.text-xs-left {{ item.slug }}
              td.text-end
                v-btn(
                  text
                  fab
                  color="primary"
                  @click="removeDialogOpen(item)"
                  v-if="r.is_role_delete && item.slug !== 'admin' && item.slug !== 'default'"
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
  name: "RolesPage",

  metaInfo() {
    return {
      title: `${this.d.roles || "Роли"}`
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
          text: `${this.d.name || "Наименование"}`,
          value: "title"
        },
        {
          text: `${this.d.slug || "Псевдоним"}`,
          value: "slug"
        },
        { text: "", sortable: false }
      ];
    },
    roles() {
      return this.$store.getters["role/getAll"];
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
    await this.$store.dispatch("role/findAll", data);
    await this.$store.dispatch("role/count", data);
  },

  methods: {
    async remove() {
      if (this.r.is_role_delete) {
        await this.$store.dispatch("role/remove", {
          body: { id: this.removeItem.id }
        });
        // Создаем новый массив без удаленного элемента
        const roles = this.roles.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });

        this.$store.dispatch("role/setAll", roles);
      }
    },

    removeDialogOpen(role) {
      this.removeItem = role;
      this.isRemoveDialog = true;
    }
  }
};
</script>
