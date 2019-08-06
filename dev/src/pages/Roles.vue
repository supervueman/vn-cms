<template lang="pug">
  v-flex(v-if="adminAccess")
    .body-2.mb-5 Политики доступа
    v-layout.wrap
      v-flex
        v-toolbar(flat color="white")
          v-spacer
          v-btn(
            color="primary"
            to="/role-create"
            dark
            v-if="adminAccess"
          ) Создать политику
        v-data-table(
          :headers="headers"
          :items="roles"
          :rows-per-page-items="[5]"
          hide-actions
        )
          template(v-slot:items="props")
            td.text-xs-left
              router-link(:to="`/roles/${props.item.id}`") {{ props.item.title }}
            td.text-xs-left {{ props.item.slug }}
            td.text-xs-left {{ props.item.rang }}
            td.text-xs-right
              v-btn(
                flat
                fab
                color="primary"
                @click="removeDialogOpen(props.item)"
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
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        {
          text: "Псевдоним",
          value: "slug"
        },
        {
          text: "Ранг",
          value: "rang"
        },
        { text: "", sortable: false }
      ],
      isRemoveDialog: false,
      removeItem: {},
      limit: 5
    };
  },

  computed: {
    roles() {
      return this.$store.getters["role/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("role/findAll");
  },

  methods: {
    async remove() {
      await this.$store.dispatch("role/remove", this.removeItem.id);
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
