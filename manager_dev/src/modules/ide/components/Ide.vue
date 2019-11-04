<template lang="pug">
  v-card
    v-card-text
      ace(
        @input="changeContent($event)"
        v-model="value"
        @init="editorInit"
        lang="html"
        theme="monokai"
        width="100%"
        height="500"
      )
    v-card-actions
      v-btn.ml-2(
        @click="create"
        color="primary"
        v-if="operationType === 'create'"
      ) {{d.save || "Сохранить"}}
      v-btn.ml-2(
        @click="update"
        color="primary"
        v-if="operationType === 'update'"
      ) {{d.save || "Сохранить"}}
      v-btn(
        @click="remove"
        color="error"
        v-if="operationType === 'update'"
      ) {{d.delete || "Удалить"}}
</template>

<script>
export default {
  name: "Ide",

  props: {
    operationType: {
      type: String,
      default: "create"
    }
  },

  data() {
    return {
      value: ""
    };
  },

  methods: {
    create() {
      this.$emit("create", this.content);
    },
    update() {
      this.$emit("update", this.content);
    },
    remove() {
      this.$emit("remove");
    },
    changeContent(event) {
      this.$emit("change", this.value);
    }
  }
};
</script>
