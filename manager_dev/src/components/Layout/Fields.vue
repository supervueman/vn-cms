<template lang="pug">
  v-flex
    v-data-table(
      :headers="headers"
      :items="fields"
      v-model="selected"
      hide-actions
    )
      template(v-slot:headers="props")
        th
          v-checkbox(
            color="primary"
            :input-value="props.all"
            :indeterminate="props.indeterminate"
            hide-details
            @click.stop="toggleAll"
          )
        th.text-xs-left(
          v-for="header in props.headers"
          :key="header.text"
          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
          @click="changeSort(header.value)"
        ) {{header.text}}
          v-icon(small) arrow_upward
      template(v-slot:items="props")
        tr(
          :active="props.selected"
          @click="props.selected = !props.selected"
        )
          td.text-xs-left
            v-checkbox(
              color="primary"
              :input-value="props.selected"
              primary
              hide-details
          )
          td.text-xs-left
            router-link(:to="`/fields/${props.item.id}`") {{ props.item.title }}
          td.text-xs-left 
            div(
              v-for="layout in props.item.layouts"
              :key="layout.id"
            )
              router-link(
                :to="`/layouts/${layout.id}`"
              ) {{layout.title}}
          td.text-xs-left {{props.item.fieldType}}
</template>

<script>
// Mixins
import accessMixin from "@/mixins/accessMixin";

export default {
  name: "Fields",
  mixins: [accessMixin],

  data() {
    return {
      headers: [
        {
          text: "Наименование",
          value: "title"
        },
        { text: "Шаблон", sortable: false },
        { text: "Тип", value: "fieldType", sortable: true }
      ],
      pagination: {
        page: this.$route.query.skip / this.$route.query.limit || 1
      },
      selected: []
    };
  },

  computed: {
    fields() {
      return this.$store.getters["field/getAll"];
    }
  },

  async mounted() {
    await this.$store.dispatch("field/fetchAll", {
      id: this.$route.params.id,
      skip: this.$route.query.skip,
      limit: this.$route.query.limit
    });
  },

  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.fields.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>
