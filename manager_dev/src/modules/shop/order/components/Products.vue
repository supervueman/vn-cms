<template lang="pug">
	v-flex
		v-toolbar(flat)
			v-spacer
			v-text-field.mr-2(
				v-model="title"
				:label="`${d.title || 'Title'}:`"
			)
			v-text-field.mr-2(
				v-model="article"
				:label="`${d.article || 'Article'}:`"
			)
			v-btn(
				color="primary"
				depressed
				@click="search"
			) {{d.search || 'Search'}}

			v-tooltip(top v-if="r.is_product_read")
				template(v-slot:activator="{ on }")
					v-btn(
						slot="activator"
						text
						icon
						color="primary"
						v-on="on"
						@click="reload"
					)
						v-icon replay
				span {{d.reload || 'Reload'}}

		v-data-table(
			:headers="headers"
			:items="products"
			hide-default-footer
		)
			template(v-slot:body="{items}")
				tbody
					tr(v-for="item in items" :key="item.id")
						td
							router-link(:to="`/shop/products/${item.id}`") {{item.title}}
						td {{item.article}}
						td {{item.price}}
						td {{item.weight}}
						td.text-right
							v-btn(
								color="primary"
								depressed
								v-if="r.is_order_update"
								@click="addToOrder(item)"
							) {{d.add_to_order || 'Add to order'}}
		.text-xs-center.pt-2
			pagination(
				:itemsLength="count"
				@getPage="getPage"
				:limit="limit"
			)
</template>

<script>
export default {
  name: "Products",

  data: () => ({
    title: "",
    article: "",
    limit: 10
  }),

  computed: {
    order() {
      return this.$store.getters["shop/order/get"];
    },
    products() {
      return this.$store.getters["shop/product/getAll"];
    },
    count() {
      return this.$store.getters["shop/product/getCount"];
    },
    headers() {
      return [
        { text: this.d.name || "Name", value: "title" },
        { text: this.d.article || "Article", sortable: false },
        { text: this.d.price || "Price", sortable: false },
        { text: this.d.weight || "Weight", sortable: false },
        { text: "", sortable: false }
      ];
    }
  },

  async mounted() {
    await this.$store.dispatch("resourcetype/findOne", {
      query: {
        filter: {
          where: {
            slug: "product"
          }
        }
      }
    });

    await this.$store.dispatch("shop/product/findAll", {
      query: {
        filter: {
          limit: this.$route.query.limit || this.limit,
          offset: this.$route.query.offset || 0,
          where: {
            lang: this.$store.getters["base/getMainLang"],
            resourcetypeId: this.$store.getters["resourcetype/get"].id
          }
        }
      }
    });

    await this.$store.dispatch("shop/product/count", {
      query: {
        filter: {
          where: {
            lang: this.$store.getters["base/getMainLang"],
            resourcetypeId: this.$store.getters["resourcetype/get"].id
          }
        }
      }
    });
  },

  methods: {
    async search() {
      const data = {};

      if (this.article !== "") {
        data.article = this.article;
      }

      if (this.title !== "") {
        data.title = this.title;
      }

      await this.$store.dispatch("shop/product/findAll", {
        query: {
          filter: {
            where: {
              ...data,
              resourcetypeId: this.$store.getters["resourcetype/get"].id
            }
          }
        }
      });
    },

    async reload() {
      this.article = "";
      this.title = "";
      await this.$store.dispatch("shop/product/findAll", {
        query: {
          filter: {
            where: {
              resourcetypeId: this.$store.getters["resourcetype/get"].id
            }
          }
        }
      });
    },

    async getPage({ offset, limit }) {
      await this.$store.dispatch("shop/product/findAll", {
        query: {
          filter: {
            offset,
            limit,
            order: [["createdAt", "DESC"]],
            where: {
              lang: this.$store.getters["base/getMainLang"],
              resourcetypeId: this.$store.getters["resourcetype/get"].id
            }
          }
        }
      });
    },

    addToOrder(item) {
      let bool = true;

      this.order.summ += item.price;

      if (!this.order.products) {
        this.order.products = [];
      }

      this.order.products.forEach(el => {
        if (el.id === item.id) {
          el.OrderProduct.quantity += 1;
          bool = false;
        }
      });

      if (bool) {
        this.order.products.push({
          ...item,
          OrderProduct: {
            quantity: 1,
            modificators: []
          }
        });
      }
    }
  }
};
</script>
