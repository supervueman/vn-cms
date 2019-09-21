<template lang="pug">
	v-flex(v-if="adminAccess")
		.body-2.mb-12.mt-2 Системные настройки
		v-layout.wrap
			v-flex
				v-data-table(
					:headers="headers"
					:items="systemSettings"
					:items-per-page-options="[limit]"
					hide-default-footer
				)
					template(v-slot:body="{items}")
						tbody
							tr(v-for="item in items" :key="item.id")
								td.text-xs-left {{ item.title }}
								td.text-xs-left {{ item.slug }}
								td.text-end
									v-switch(
										v-model="item.value"
										@change="update(item)"
									)
				div.text-xs-center.pt-2
					pagination(
						:itemsLength="count"
						@getPage="getPage"
						:limit="limit"
					)
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

// Query
import { querySystemSettings } from "@/query/systemSetting";

export default {
  name: "SystemSettingsPage",

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
        { text: "", value: "value", sortable: false }
      ],
      limit: 10
    };
  },

  computed: {
    systemSettings() {
      return this.$store.getters["systemSetting/getAll"];
    },
    count() {
      return this.$store.getters["systemSetting/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: querySystemSettings()
    };
    await this.$store.dispatch("systemSetting/findAll", data);
    await this.$store.dispatch("systemSetting/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: querySystemSettings(offset, limit)
      };
      await this.$store.dispatch("systemSetting/findAll", data);
    },

    async update(item) {
      await this.$store.dispatch("systemSetting/update", item);
    }
  }
};
</script>
