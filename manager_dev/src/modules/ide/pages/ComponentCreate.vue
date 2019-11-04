<template lang="pug">
  ide(
    @update="update"
    operationType="create"
  )
</template>

<script>
import axios from "axios";
import requestHandler from "@/core/plugins/requestDataHandler";

// Components
import Ide from "../components/Ide";

export default {
  components: {
    Ide
  },

  methods: {
    async update(component) {
      const data = requestHandler("POST", "/ide/save-component", {
        name: component.name,
        content: component.content
      });
      const response = await axios(data);
    }
  }
};
</script>
