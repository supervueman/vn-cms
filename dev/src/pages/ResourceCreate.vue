<template lang="pug">
  v-flex(v-if="managerAccess")
    .body-2.mb-5 Создание ресурса
      v-layout.wrap.pt-5
        resource-view(
          :resource="resource"
          operationType="create"
        )
</template>

<script>
// Components
import ResourceView from "@/components/Resource/View";

// Mixins
import accessMixin from "@/mixins/accessMixin";

// Models
import resource from "@/models/resource";

export default {
  name: "ResourceCreatePage",

  components: {
    ResourceView
  },

  mixins: [accessMixin],

  data() {
    return {
      resource
    };
  }
};
</script>
