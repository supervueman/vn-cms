<template lang="pug">
	v-flex
		editor-menu-bar(:editor="editor" v-slot="{ commands, isActive }")
			v-toolbar.menubar(flat height="40px")
				v-icon.mr-2(
					big
					:color="!isActive.bold() ? 'black' : 'primary'"
					@click="commands.bold"
				) format_bold

				v-icon.mr-2(
					big
					:color="!isActive.italic() ? 'black' : 'primary'"
					@click="commands.italic"
				) format_italic

				v-icon.mr-2(
					big
					:color="!isActive.strike() ? 'black' : 'primary'"
					@click="commands.strike"
				) format_strikethrough

				v-icon.mr-2(
					big
					:color="!isActive.underline() ? 'black' : 'primary'"
					@click="commands.underline"
				) format_underlined

				v-icon.mr-2(
					big
					:color="!isActive.code() ? 'black' : 'primary'"
					@click="commands.code"
				) code

				v-icon.mr-2(
					big
					:color="!isActive.paragraph() ? 'black' : 'primary'"
					@click="commands.paragraph"
				) format_textdirection_l_to_r

				button.mr-2(
					@click="commands.heading({ level: 1 })"
				) H1

				button.mr-2(
					@click="commands.heading({ level: 2 })"
				) H2

				button.mr-2(
					@click="commands.heading({ level: 3 })"
				) H3

				v-icon.mr-2(
					big
					:color="!isActive.bullet_list() ? 'black' : 'primary'"
					@click="commands.bullet_list"
				) format_list_bulleted

				v-icon.mr-2(
					big
					:color="!isActive.ordered_list() ? 'black' : 'primary'"
					@click="commands.ordered_list"
				) format_list_numbered

				v-icon.mr-2(
					big
					:color="!isActive.blockquote() ? 'black' : 'primary'"
					@click="commands.blockquote"
				) format_quote

				v-icon.mr-2(
					big
					:color="!isActive.code_block() ? 'black' : 'primary'"
					@click="commands.code_block"
				) code

				v-icon.mr-2(
					big
					:color="!isActive.horizontal_rule() ? 'black' : 'primary'"
					@click="commands.horizontal_rule"
				) remove

				v-icon.mr-2(
					big
					@click="commands.undo"
				) undo

				v-icon.mr-2(
					big
					@click="commands.redo"
				) redo

				v-icon.mr-2(
					big
					:color="!isActive.image() ? 'black' : 'primary'"
					@click="showImage(commands.image, filePath)"
				) image
		editor-content(:editor="editor" :setContent="content")

		v-flex
			div(class="export")
				div(v-html="html")
		v-dialog(v-model="isActiveDialog")
			filesystem(@selectFile="selectFile" ref="getfile")
			v-card
				v-card-actions
					v-btn.ml-2(@click="isActiveDialog = false") Закрыть

</template>

<script>
// Components
import Filesystem from "@/components/Filesystem/Filesystem";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";

// Config
import { imgFolderBasePath } from "@/config";

// Libs extensions
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image
} from "tiptap-extensions";

export default {
  name: "Editor",

  components: {
    Filesystem,
    EditorContent,
    EditorMenuBar
  },

  props: {
    content: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image()
        ],
        content: this.content,
        onUpdate: ({ getHTML, content }) => {
          this.$emit("update", getHTML);
        }
      }),
      html: "",
      isActiveDialog: false,
      imgFolderBasePath,
      filePath: null,
      command: null
    };
  },

  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    showImage(command, src) {
      this.isActiveDialog = true;
      this.command = command;
    },
    selectFile(file, command) {
      this.command({ src: `/static/${file.path}` });
      this.isActiveDialog = false;
    }
  }
};
</script>


<style lang="sass">
.ProseMirror
	border: 1px solid lightgrey
	min-height: 200px
	outline: none
	padding: 16px
.menubar
	border: 1px solid lightgrey
	border-bottom: none
</style>

