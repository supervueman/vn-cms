<template lang="pug">
	v-flex(v-if="adminAccess")
		.body-2.mb-12.mt-2 {{d.system_settings}}
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

export default {
  name: "SystemSettingsPage",

  mixins: [accessMixin],

  data() {
    return {
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
        { text: "", value: "value", sortable: false }
      ];
    },
    systemSettings() {
      return this.$store.getters["systemSetting/getAll"];
    },
    count() {
      return this.$store.getters["systemSetting/getCount"];
    }
  },

  async mounted() {
    const data = {
      query: {
        filter: {
          offset: this.$route.query.offset || 0,
          limit: this.$route.query.limit || this.limit,
          order: [["createdAt", "DESC"]]
        }
      }
    };
    await this.$store.dispatch("systemSetting/findAll", data);
    await this.$store.dispatch("systemSetting/count", data);
  },

  methods: {
    async getPage({ offset, limit }) {
      const data = {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]]
          }
        }
      };
      await this.$store.dispatch("systemSetting/findAll", data);
    },

    async update(item) {
      await this.$store.dispatch("systemSetting/update", { body: item });
    }
  }
};
</script>
