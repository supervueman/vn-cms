const mixin = {
  data() {
    return {
      panel: [true]
    }
  },
  watch: {
    panel() {
      localStorage.setItem(this.panelName, this.panel[0]);
    }
  },
  mounted() {
    const panel = localStorage.getItem(this.panelName);
    if (panel === "false") {
      this.panel = [false];
    } else if (panel === "true") {
      this.panel = [true];
    }
  }
};

export default mixin;
