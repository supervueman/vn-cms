<template lang="pug">
  v-layout(v-if="r.is_users_read")
    v-flex
      .body-2.mt-2 {{d.users}}
        v-layout.wrap.pt-12
          v-flex
            v-toolbar(flat color="white")
              v-spacer
              v-btn(
                color="primary"
                dark
                v-if="r.is_user_create"
                to="/profile-create"
              ) {{d.create_user}}
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
                    td.text-end
                      v-btn(
                        text
                        fab
                        color="primary"
                        @click="removeDialogOpen(item)"
                        v-if="r.is_user_delete"
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

export default {
  name: "Users",

  mixins: [accessMixin],

  metaInfo() {
    return {
      title: `${this.d.users || "Users"}`
    };
  },

  data() {
    return {
      isRemoveDialog: false,
      removeItem: {},
      imgFolderBasePath,
      limit: 10
    };
  },

  computed: {
    headers() {
      return [
        {
          text: "",
          sortable: false
        },
        { text: this.d.name, sortable: true, value: "lastname" },
        { text: this.d.contacts, sortable: false },
        { text: this.d.role, sortable: true, value: "role.slug" },
        { text: "", sortable: false }
      ];
    },
    users() {
      return this.$store.getters["user/getAll"];
    },
    count() {
      return this.$store.getters["user/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          include: ["role"],
          order: [["createdAt", "DESC"]]
        }
      }
    };
    await this.$store.dispatch("user/findAll", data);
    await this.$store.dispatch("user/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            include: ["role"],
            order: [["createdAt", "DESC"]]
          }
        }
      };
      await this.$store.dispatch("user/findAll", data);
    },

    async remove() {
      if (!this.r.is_user_delete) {
        return;
      }
      if (this.removeItem.id === this.$store.getters["profile/get"].id) {
        await this.$store.dispatch("profile/remove", {
          body: { id: this.removeItem.id }
        });
        await this.$store.dispatch("authenticate/logout");
        this.$router.push("/");
      } else {
        await this.$store.dispatch("user/remove", {
          body: { id: this.removeItem.id }
        });
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
