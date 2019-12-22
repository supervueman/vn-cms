<template lang="pug">
  v-card.mb-3(outlined)
    v-card-text(v-if="!r.is_user_update") {{d.context || 'Контекст'}}: {{profile.context.slug}}
    v-card-text(v-if="r.is_user_update")
      v-select(
        :items="contexts"
        item-text="title"
        item-value="id"
        v-model="profile.contextId"
        :label="`${d.context || 'Контекст'}:`"
      )
    v-card-actions(v-if="r.is_user_update")
      v-btn.ml-2.mb-2(
        color="primary"
        depressed
        @click="update"
      ) {{d.save || 'Сохранить'}}
</template>

<script>
export default {
  name: "ProfileRoleData",

  props: {
    profile: {
      type: Object,
      default: () => {}
    },

    contexts: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    async update() {
      if (this.r.is_user_update) {
        const data = {
          body: {
            id: this.profile.id,
            contextId: Number(this.profile.contextId)
          },
          query: {
            filter: {
              include: ["role", "context"]
            }
          }
        };
        await this.$store.dispatch("user/update", data);
      }
    }
  }
};
</script>
