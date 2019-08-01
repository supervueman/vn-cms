<template lang="pug">
  v-layout
    v-flex
      .body-2.mb-5 Ресурс: {{resource.title}}
      v-tabs(slot="extension" v-model="tab" grow)
        v-tabs-slider(color="primary")
        v-tab Общие данные
        v-tab Дополнительные поля
        v-tab Ресурсы
        v-tabs-items
          v-tab-item
            v-layout.pt-4
              resource-view(
                :resource="resource"
                operationType="update"
              )
          v-tab-item
            v-layout.wrap.pt-4
              v-card
                v-card-text
                  fields
          v-tab-item
            v-layout.wrap.pt-4
              v-flex
                v-card
                  v-card-text
                    resources
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Components
import ResourceView from "@/components/Resource/View";
import Fields from "@/components/Resource/Fields";
import Resources from "@/components/Resource/Resources";

export default {
  name: "Resource",

  components: {
    ResourceView,
    Resources,
    Fields
  },

  mixins: [accessMixin],

  data() {
    return {
      menu: false,
      tab: null
    };
  },

  computed: {
    resource() {
      return this.$store.getters["resource/get"];
    }
  },

  async mounted() {
    await this.$store.dispatch("resource/fetch", this.$route.params.id);
  }
};
</script>
