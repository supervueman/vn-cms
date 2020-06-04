<template lang="pug">
	v-flex(v-if="r.is_productmodificator_read")
		v-data-table(
			:headers="headers"
			:items="productmodificators"
			:items-per-page-options="[limit]"
			hide-default-footer
		)
			template(v-slot:body="{items}")
				tbody
					tr(v-for="item in items" :key="item.id")
						td.text-xs-left {{item.slug}}
						td.text-xs-left {{item.title}}
						td.text-end
							v-btn(
								color="primary"
								depressed
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
  name: "ModificatorsComponent",

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
        { text: "", sortable: false }
      ];
    },
    productmodificators() {
      return this.$store.getters["shop/productmodificator/getAll"];
    },
    count() {
      return this.$store.getters["shop/productmodificator/getCount"];
    },
    product() {
      return this.$store.getters["shop/product/get"];
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
    await this.$store.dispatch("shop/productmodificator/findAll", data);
    await this.$store.dispatch("shop/productmodificator/count", {});
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
      await this.$store.dispatch("shop/productmodificator/findAll", data);
    },

    addModificator(item) {
      const modificator = {
        slug: item.slug,
        title: item.title,
        operator: item.operator,
        price: "",
        weight: "",
        image: ""
      };
      if (this.product.modificators) {
        if (this.product.modificators.find(el => el.slug === item.slug)) {
          return;
        }
      } else {
        this.product.modificators = [];
      }

      this.product.modificators.push(modificator);
    }
  }
};
</script>
