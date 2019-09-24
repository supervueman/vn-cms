<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-12.mt-2 {{d.roles_politics}}
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/role-create"
            dark
            v-if="adminAccess"
          ) {{d.create_role}}
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
                    v-if="adminAccess"
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
// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "RolesPage",

  mixins: [accessMixin],

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
        {
          text: this.d.slug,
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
      await this.$store.dispatch("role/remove", {
        body: { id: this.removeItem.id }
      });
      const roles = this.roles.filter(el => {
        if (el.id !== this.removeItem.id) {
          return el;
        }
      });
      this.$store.dispatch("role/setAll", roles);
    },

    removeDialogOpen(role) {
      this.removeItem = role;
      this.isRemoveDialog = true;
    }
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("role/clear");
    next();
  }
};
</script>
