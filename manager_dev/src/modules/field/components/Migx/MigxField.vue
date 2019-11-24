<template lang="pug">
  v-flex
    v-toolbar(flat color="white")
      v-spacer
      v-btn(
        color="primary"
        @click="openCreateDialog"
      ) {{this.d.add_element}}
    v-data-table(
      :headers="headers"
      :items="field"
      hide-default-footer
    )
      template(v-slot:body="{items}")
        tbody
          tr(v-for="(item, i) in items" :key="item.id")
            td(v-for="(elem, i) in item" :key="i")
              v-flex(v-if="elem.interface.fieldType === 'image'")
                v-img(:src="`/static/${elem.value}`" max-width="60px" alt="alt")
              v-flex(v-else) {{ elem.value }}
            td.text-end
              v-btn(
                color="primary"
                fab
                text
                @click="openUpdateDialog(item, i)"
              )
                v-icon edit
              v-btn(
                color="primary"
                fab
                text
                @click="openRemoveDialog(item, i)"
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
