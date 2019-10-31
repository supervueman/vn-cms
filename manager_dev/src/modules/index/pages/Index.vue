<template lang="pug">
  div.page Main page
</template>

<script>
export default {
  name: "Index",

  metaInfo() {
    return {
      title: `${this.d.main || "Main"}`
    };
  }
};
</script>
