<template lang="pug">
  v-flex
    v-toolbar(flat color="white")
      v-spacer
      v-btn(
        color="primary"
        @click="openCreateDialog"
      ) Добавить элемент
    v-data-table(
      :headers="headers"
      :items="field"
      hide-actions
    )
      template(v-slot:items="props")
        tr
          td(v-for="(item, i) in props.item" :key="i")
            v-flex(v-if="item.interface.fieldType === 'image'")
              v-img(:src="`/static/${item.value}`" max-width="60px" alt="alt")
            v-flex(v-else) {{ item.value }}
          td.text-xs-right
            v-btn(
              color="primary"
              fab
              flat
              @click="openUpdateDialog(props.item, props.index)"
            )
              v-icon edit
            v-btn(
              color="primary"
              fab
              flat
              @click="openRemoveDialog(props.item, props.index)"
            )
              v-icon delete
    v-dialog(
      v-model="isCreateDialog"
    )
      migx-field-create-dialog(
        :schema="schema"
        @create="create"
        @cancel="isCreateDialog = false"
      )
    v-dialog(
      v-model="isUpdateDialog"
    )
      migx-field-update-dialog(
        @update="update"
        :fields="updateItem"
        @cancel="isUpdateDialog = false"
      )
    v-dialog(
      v-model="isRemoveDialog"
      max-width="500"
    )
      remove-confirm(
        @remove="remove"
        :isActive.sync="isRemoveDialog"
        name="элемент поля"
      )
</template>

<script>
// Components
import MigxFieldCreateDialog from "./MigxFieldCreateDialog";
import MigxFieldUpdateDialog from "./MigxFieldUpdateDialog";

export default {
  name: "MigxField",

  components: {
    MigxFieldCreateDialog,
    MigxFieldUpdateDialog
  },

  props: {
    field: {
      type: Array,
      default() {
        return [];
      }
    },
    schema: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isCreateDialog: false,
      isUpdateDialog: false,
      updateItem: {},
      updateItemIndex: 0,
      isRemoveDialog: false,
      removeItemIndex: 0
    };
  },

  computed: {
    headers() {
      const headers = [];
      const schema = JSON.parse(this.schema);
      for (let key in schema) {
        headers.push({ sortable: false, text: schema[key].title });
      }
      headers.push({
        text: "",
        sortable: false
      });
      return headers;
    }
  },

  methods: {
    openCreateDialog() {
      this.isCreateDialog = true;
    },
    openUpdateDialog(item, i) {
      this.isUpdateDialog = true;
      this.updateItem = item;
      this.updateItemIndex = i;
    },
    openRemoveDialog(item, i) {
      this.isRemoveDialog = true;
      this.removeItemIndex = i;
    },
    create(item) {
      this.$emit("create", item);
      this.isCreateDialog = false;
    },
    update(item) {
      this.$emit("update", { item, index: this.updateItemIndex });
      this.isUpdateDialog = false;
    },
    remove() {
      this.$emit("remove", this.removeItemIndex);
      this.isRemoveDialog = false;
    }
  }
};
</script>
