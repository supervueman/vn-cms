<template lang="pug">
  v-pagination(
    v-model="pagination.page"
    :length="pages"
    @input="getPage"
    :value="0"
    :total-visible="3"
  )
</template>

<script>
export default {
  name: "Pagination",
  props: {
    itemsLength: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    offset: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      pagination: {
        page: this.$route.query.offset / this.$route.query.limit + 1 || 1
      }
    };
  },

  computed: {
    pages() {
      if (this.itemsLength === 0) return 0;
      return Math.ceil(this.itemsLength / this.limit);
    }
  },

  methods: {
    getPage(page) {
      let url = `${this.$route.path}?offset=${page * this.offset -
        this.offset}&limit=${this.limit}`;

      for (let key in this.$route.query) {
        if (key !== "offset" && key !== "limit")
          url += `&${key}=${this.$route.query[key]}`;
      }

      this.$router.push(url);

      this.$emit("getPage", {
        offset: Number(this.$route.query.offset),
        limit: Number(this.$route.query.limit)
      });
    }
  }
};
</script>

<style lang="sass">
  .v-pagination__item--active, .v-pagination__item, .v-pagination__navigation
    box-shadow: none
</style>
