<template lang="pug">
	v-flex(v-if="r.is_ordermodificator_read")
		v-data-table(
			:headers="headers"
			:items="ordermodificators"
			:items-per-page-options="[limit]"
			hide-default-footer
		)
			template(v-slot:body="{items}")
				tbody
					tr(v-for="item in items" :key="item.id")
						td.text-xs-left {{item.slug}}
						td.text-xs-left {{item.title}}
						td.text-xs-left {{item.target}}
						td.text-xs-left {{item.operator}}
						td.text-end
							v-btn(
								color="primary"
								depressed
								v-if="adminAccess"
								@click="addModificator(item)"
							) {{d.add_modificator || 'Add modificator'}}
		v-card-actions.text-xs-center.pt-2
			pagination(
				:itemsLength="count"
				@getPage="getPage"
				:limit="limit"
			)
</template>

<script>
export default {
  name: "ModificatorsLayerComponent",

  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      limit: 10
    };
  },

  computed: {
    headers() {
      return [
        {
          text: this.d.slug || "Slug",
          value: "slug"
        },
        {
          text: this.d.name || "Name",
          value: "title"
        },
        {
          text: this.d.target || "Target",
          value: "target"
        },
        {
          text: this.d.operator || "Operator",
          value: "operator"
        },
        { text: "", sortable: false }
      ];
    },
    ordermodificators() {
      return this.$store.getters["shop/ordermodificator/getAll"];
    },
    count() {
      return this.$store.getters["shop/ordermodificator/getCount"];
    },
    order() {
      return this.$store.getters["shop/order/get"];
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
    await this.$store.dispatch("shop/ordermodificator/findAll", data);
    await this.$store.dispatch("shop/ordermodificator/count", {});
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
      await this.$store.dispatch("shop/ordermodificator/findAll", data);
    },

    addModificator(item) {
      const modificator = {
        slug: item.slug,
        title: item.title,
        target: item.target,
        operator: item.operator,
        value: ""
      };

      let modificators = [];
      if (this.order.modificators) {
        modificators = this.order.modificators;

        if (modificators.find(el => el.slug === item.slug)) {
          return;
        }
      }

      modificators.push(modificator);

      this.order.modificators = modificators;
    }
  }
};
</script>
