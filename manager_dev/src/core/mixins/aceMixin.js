const mixin = {
  components: {
    ace: require("vue2-ace-editor")
  },

  mounted() {
    require(['emmet/emmet'], function (data) {
      window.emmet = data.emmet;
    });
  },

  methods: {
    editorInit: function () {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/theme/monokai");
      require("brace/snippets/javascript");
    }
  }
}

export default mixin;
