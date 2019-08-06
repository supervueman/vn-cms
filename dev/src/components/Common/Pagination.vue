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
      default: 5
    },
    skip: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit + 1 || 1
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
        `${this.$route.path}?skip=${page * this.skip - this.skip}&limit=${
          this.limit
        }`
      );
      this.$emit("getPage", {
        skip: Number(this.$route.query.skip),
        limit: Number(this.$route.query.limit)
      });
    }
  }
};
</script>
