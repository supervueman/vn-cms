<template lang="pug">
  v-layout(v-if="adminAccess")
    v-flex
      .body-2.mb-5 Пользователи
        v-layout.wrap.pt-5
          v-flex
            v-toolbar(flat color="white")
              v-spacer
              v-btn(
                color="primary"
                dark
                v-if="adminAccess"
                to="/profile-create"
              ) Создать пользователя
            v-data-table(
              :headers="headers"
              :items="users"
              :rows-per-page-items="[5]"
              hide-actions
            )
              template(v-slot:items="props")
                td.text-xs-left
                  router-link(:to="`/users/${props.item.id}`")
                    v-avatar(
                      :size="40"
                      color="grey lighten-4"
                    )
                      img(:src="`${imgFolderBasePath}/${props.item.image}`" alt="avatar")
                td.text-xs-left
                  router-link(:to="`/users/${props.item.id}`") {{ props.item.lastname }} {{ props.item.firstname }}
                td.text-xs-left
                  div
                    a(:href="`mailto:${props.item.email}`") {{props.item.email}}
                  div
                    a(:href="`tel:${props.item.phone}`") {{props.item.phone}}
                td.text-xs-left {{props.item.role}}
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
                :itemsLength="count"
                @getPage="getPage"
              )
        v-dialog(
          v-model="isRemoveDialog"
          max-width="500px"
        )
          remove-confirm(
            @remove="remove"
            :isActive.sync="isRemoveDialog"
            :name="`${removeItem.lastname} ${removeItem.firstname}`"
          )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Config
import { imgFolderBasePath } from "@/config";

export default {
  name: "Users",

  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "",
          sortable: false
        },
        { text: "Имя", sortable: true, value: "lastname" },
        { text: "Контакты", sortable: false },
        { text: "Роль", sortable: true, value: "role" },
        { text: "", sortable: false }
      ],
      isRemoveDialog: false,
      removeItem: {},
      imgFolderBasePath
    };
  },

  computed: {
    users() {
      return this.$store.getters["user/getAll"];
    },
    count() {
      return this.$store.getters["user/getCount"];
    }
  },

  async mounted() {
    await this.$store.dispatch("user/fetchAll", {
      skip: this.$route.query.skip || 0,
      limit: this.$route.query.limit || 5
    });
  },

  methods: {
    async getPage({ skip, limit }) {
      await this.$store.dispatch("user/fetchAll", {
        skip,
        limit
      });
    },

    async remove() {
      await this.$store.dispatch("profile/remove", this.removeItem.id);
    },

    removeDialogOpen(user) {
      this.removeItem = user;
      this.isRemoveDialog = true;
    }
  }
};
</script>
