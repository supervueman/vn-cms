<template lang="pug">
  v-layout(v-if="adminAccess || managerAccess")
    v-flex
      .body-2.mt-2 Пользователи
        v-layout.wrap.pt-12
          v-flex
            v-toolbar(flat color="white")
              v-spacer
              v-btn(
                color="primary"
                dark
                v-if="adminAccess || managerAccess"
                to="/profile-create"
              ) Создать пользователя
            v-data-table(
              :headers="headers"
              :items="users"
              :items-per-page-options="[limit]"
              hide-default-footer
            )
              template(v-slot:body="{items}")
                tbody
                  tr(v-for="item in items" :key="item.id")
                    td.text-xs-left
                      router-link(:to="`/users/${item.id}`")
                        v-avatar(
                          :size="40"
                          color="grey lighten-4"
                        )
                          img(:src="`${imgFolderBasePath}/${item.image}`" alt="avatar")
                    td.text-xs-left
                      router-link(:to="`/users/${item.id}`") {{ item.lastname }} {{ item.firstname }}
                    td.text-xs-left
                      div
                        a(:href="`mailto:${item.email}`") {{item.email}}
                      div
                        a(:href="`tel:${item.phone}`") {{item.phone}}
                    td.text-xs-left {{item.role.slug}}
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
            :name="`${removeItem.lastname} ${removeItem.firstname}`"
          )
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Config
import { imgFolderBasePath } from "@/config";

// Query
import { queryUsers } from "@/query/user";

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
        { text: "Роль", sortable: true, value: "role.slug" },
        { text: "", sortable: false }
      ],
      isRemoveDialog: false,
      removeItem: {},
      imgFolderBasePath,
      limit: 10
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
    const data = {
      query: queryUsers(
        this.$route.query.offset || 0,
        this.$route.query.limit || this.limit
      )
    };
    await this.$store.dispatch("user/findAll", data);
    await this.$store.dispatch("user/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: queryUsers(offset, limit)
      };
      await this.$store.dispatch("user/findAll", data);
    },

    async remove() {
      if (this.removeItem.id === this.$store.getters["profile/get"].id) {
        await this.$store.dispatch("profile/remove", this.removeItem.id);
        await this.$store.dispatch("authenticate/logout");
        this.$router.push("/");
      } else {
        await this.$store.dispatch("user/remove", this.removeItem.id);
        const users = this.users.filter(el => {
          if (el.id !== this.removeItem.id) {
            return el;
          }
        });
        this.$store.dispatch("user/setAll", users);
      }
    },

    removeDialogOpen(user) {
      this.removeItem = user;
      this.isRemoveDialog = true;
    }
  }
};
</script>
