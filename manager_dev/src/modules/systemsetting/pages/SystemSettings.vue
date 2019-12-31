<template lang="pug">
	v-flex(v-if="r.is_system_setting_read")
		.body-2.mb-12.mt-2 {{d.system_settings || 'Системные настройки'}}
		v-layout.wrap
			v-flex
				v-card(outlined)
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
											v-if="item.settingType === 'switcher'"
											v-model="item.setting.value"
											@change="update(item)"
										)
										v-text-field(
											v-if="item.settingType === 'text'"
											v-model="item.setting.value"
											@change="update(item)"
										)
					v-card-actions.text-xs-center.pt-2
						pagination(
							:itemsLength="count"
							@getPage="getPage"
							:limit="limit"
						)
</template>

<script>
export default {
  name: "SystemSettingsPage",

  metaInfo() {
    return {
      title: `${this.d.system_settings || "System settings"}`
    };
  },

  data() {
    return {
      limit: 10
    };
  },

  computed: {
    headers() {
      return [
        {
          text: `${this.d.name || "Наименование"}`,
          value: "title"
        },
        {
          text: `${this.d.slug || "Псевдоним"}`,
          value: "slug"
        },
        { text: "", value: "value", sortable: false }
      ];
    },
    systemSettings() {
      return this.$store.getters["systemsetting/getAll"];
    },
    count() {
      return this.$store.getters["systemsetting/getCount"];
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
    await this.$store.dispatch("systemsetting/findAll", data);
    await this.$store.dispatch("systemsetting/count", data);
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
      await this.$store.dispatch("systemsetting/findAll", data);
    },

    async update(item) {
      if (this.r.is_system_setting_update) {
        await this.$store.dispatch("systemsetting/update", {
          body: { ...item, setting: JSON.stringify(item.setting) }
        });
      }
    }
  }
};
</script>
