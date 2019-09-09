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
      this.$router.push(
        `${this.$route.path}?offset=${page * this.offset - this.offset}&limit=${
          this.limit
        }`
      );
      this.$emit("getPage", {
        offset: Number(this.$route.query.offset),
        limit: Number(this.$route.query.limit)
      });
    }
  }
};
</script>
