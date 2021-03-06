<template>
  <v-layout class="wrap">
    <v-flex class="xl12 lg12 md12">
      <v-card
        class="xl12 lg12 md12"
        outlined
      >
        <v-card-text class="pb-0">
          {{ d.current_path || 'Current path' }}: {{ currentFullPath }}
        </v-card-text>

        <v-card-text>
          <v-layout class="filesystem--window">
            <v-flex class="xl3 lg3 md3">
              <v-layout class="column filesystem--tree">
                <v-flex class="mb-4">
                  <treeview-controls
                    :currentFileType="currentFile.type"
                    :currentFile="currentFile.relativePath"
                    @openDialogForCreateFolder="openDialogForCreateFolder"
                    @triggerForUploadFile="triggerForUploadFile"
                    @filesystemReload="filesystemReload"
                  />
                </v-flex>
                <v-flex class="xl3 lg3 md3 filesystem--tree-list">
                  <v-treeview
                    v-model="tree"
                    :open.sync="open"
                    :items="filesystem"
                    activatable
                    item-key="name"
                    open-on-click
                    return-object
                    hoverable
                    transition
                    active-class="primary--text"
                  >
                    <template v-slot:prepend="{ item, open }">
                      <div
                        class="treeview-node-overlay"
                        :class="{'active-treeview-node': currentFullPath === item.path}"
                        @click="fetchFolderContent(item)"
                        @contextmenu.prevent="fetchContextMenu($event, item)"
                      />
                      <v-icon
                        v-if="item.type === 'directory'"
                        :color="open ? 'primary' : ''"
                      >
                        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                      </v-icon>
                      <v-icon
                        v-else
                        :color="open ? 'primary' : ''"
                      >
                        {{ files[item.extension] }}
                      </v-icon>
                    </template>
                  </v-treeview>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-divider
              class="mx-2"
              vertical
            />

            <v-layout
              class="row wrap pl-2"
              fill-height
              align-start
              justify-start
            >
              <v-flex
                v-for="(file, i) in folderContent"
                v-if="file.type === 'file'"
                :key="i"
                class="py-1 px-1"
                lg2
              >
                <v-card
                  outlined
                  @click="fetchFolderContent(file)"
                  @contextmenu.prevent="fetchContextMenu($event, file)"
                  @dblclick="selectFile(file)"
                >
                  <v-img
                    :src="`/static/${file.path}`"
                    aspect-ratio="1"
                  />
                  <v-flex
                    class="px-2 file-name"
                    :class="{'active-card-file': currentFullPath === file.path}"
                  >
                    {{ file.path }} {{ imgFolderBasePath }}
                  </v-flex>
                </v-card>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-menu
      v-model="isContext"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <context-menu-list
        :currentFile="currentFile"
        @triggerForUploadFile="triggerForUploadFile"
        @openDialogForCreateFolder="openDialogForCreateFolder"
        @openDialogForRemoveConfirm="openDialogForRemoveConfirm"
      />
    </v-menu>

    <v-dialog
      v-model="isRemoveConfirmDialog"
      max-width="500px"
    >
      <remove-confirm
        :isActive.sync="isRemoveConfirmDialog"
        :name="currentFullPath"
        @remove="removeFileOrFolder"
      />
    </v-dialog>

    <v-dialog
      v-model="isCreateFolderDialog"
      max-width="500px"
    >
      <create-folder
        :isActive.sync="isCreateFolderDialog"
        @createFolder="createFolder"
      />
    </v-dialog>

    <input
      ref="file"
      class="input-file"
      type="file"
      name="filesystemImages"
      multiple
      @change="upload"
    >
  </v-layout>
</template>

<script>
// Components
import ContextMenuList from "./ContextMenuList";
import CreateFolder from "./CreateFolder";
import TreeviewControls from "./TreeviewControls";

// Config
import { imgFolderBasePath } from "@/core/config";

export default {
  name: "FilesystemComponent",

  components: {
    ContextMenuList,
    CreateFolder,
    TreeviewControls
  },

  data: () => ({
    open: [],
    tree: [],
    files: {
      ".html": "mdi-language-html5",
      ".js": "mdi-nodejs",
      ".json": "mdi-json",
      ".md": "mdi-markdown",
      ".pdf": "mdi-file-pdf",
      ".png": "mdi-file-image",
      ".jpg": "mdi-file-image",
      ".jpeg": "mdi-file-image",
      ".svg": "mdi-file-image",
      ".txt": "mdi-file-document-outline",
      ".xls": "mdi-file-excel"
    },
    currentFolder: {},
    currentFile: {},
    currentElem: {},
    currentFullPath: "/",
    currentFolderPath: "/",
    isContext: false,
    x: 0,
    y: 0,
    isRemoveConfirmDialog: false,
    isCreateFolderDialog: false,

    folderData: {
      type: "directory",
      path: "/",
      name: "",
      extension: "",
      children: []
    },
    fileData: {
      type: "file",
      path: "/",
      extension: "",
      name: ""
    },
    imgFolderBasePath
  }),

  computed: {
    filesystem() {
      return this.$store.getters["filesystem/getFilesystem"];
    },
    folderContent() {
      return this.$store.getters["filesystem/getFolderContent"];
    }
  },

  beforeCreate() {
    this.$store.dispatch("filesystem/fetchFilesystem");
  },

  methods: {
    /**
     * @function fetchFolderContent
     * @var {Array} directoriesFile
     * @var {Object} dir
     * @var {Array} filesystem
     * Функция для получения файлов текущей директории
     * Если тип === file то вызывается рекурсивная функция
     * для поиска директории в которой находится файл
     */
    fetchFolderContent(item) {
      if (item.type === "file") {
        let directoriesArr = item.path.split("/").slice(this.length, -1);

        const firstItemPathSplit = this.filesystem[0].path.split("/");

        if (firstItemPathSplit.length > 1) {
          directoriesArr = directoriesArr.splice(
            firstItemPathSplit.length - 1,
            directoriesArr.length
          );
        }

        let dir = {};
        let filesystem = this.filesystem;

        function searchDirectory() {
          if (directoriesArr.length > 0) {
            filesystem.forEach((item, i) => {
              if (item.type === "directory") {
                directoriesArr.forEach((el, j) => {
                  if (item.name === el) {
                    filesystem = item.children;
                    dir = item;
                    directoriesArr.splice(j, 1);
                    return;
                  }
                });
              }
            });
            searchDirectory();
          } else {
            return;
          }
        }
        searchDirectory();
        this.$store.dispatch("filesystem/fetchFolderContent", dir.children);
        this.currentFolder = dir;
        this.currentFile = item;
        this.currentFolderPath = dir.path;
      } else {
        this.$store.dispatch("filesystem/fetchFolderContent", item.children);
        this.currentFolder = item;
        this.currentFile = {};
        this.currentFolderPath = item.path;
      }
      this.currentElem = item;
      this.currentFullPath = item.path;
    },

    fetchContextMenu(event, item) {
      this.x = event.clientX;
      this.y = event.clientY;
      this.isContext = true;
      this.currentElem = item;
      this.fetchFolderContent(item);
    },

    selectFile(file) {
      // console.log(file);
      this.$emit("selectFile", file);
    },

    async upload() {
      if (!this.r.is_filesystem_files_uploads) {
        return;
      }
      // console.log(this.currentFolderPath);
      const files = this.$refs.file.files;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

      await this.$store.dispatch("filesystem/upload", {
        formData,
        query: {
          path:
            this.currentFolderPath === "/"
              ? `../${this.filesystem[0].path}`
              : `../${this.currentFolderPath}`
        }
      });
      this.$store.dispatch("filesystem/fetchFilesystem");
    },

    async createFolder(folderName) {
      if (!this.r.is_filesystem_directory_create) {
        return;
      }
      // console.log(folderName);
      // console.log(this.currentFolderPath);
      this.isCreateFolderDialog = false;
      this.$store.dispatch("filesystem/createDir", {
        path:
          this.currentFolderPath === "/"
            ? `../${this.filesystem[0].path}/${folderName}`
            : `../${this.currentFolderPath}/${folderName}`
      });
      await this.$store.dispatch("filesystem/fetchFilesystem");
      await this.fetchFolderContent(this.currentFolder);
    },

    async removeFileOrFolder() {
      if (this.currentFullPath === this.filesystem[0].path) {
        this.$store.dispatch("notification/fetch", {
          type: "error",
          message: `${this.d.cannot_delete_root_directory ||
            "Cannot delete root directory"}`,
          isActive: true
        });
        return;
      }
      if (this.currentElem.type === "file") {
        if (!this.r.is_filesystem_files_delete) {
          return;
        }
        await this.$store.dispatch("filesystem/removeFile", {
          path: `../${this.currentFullPath}`
        });
      } else {
        if (!this.r.is_filesystem_directory_delete) {
          return;
        }
        await this.$store.dispatch("filesystem/removeDir", {
          path: `../${this.currentFullPath}`
        });
      }
      await this.$store.dispatch("filesystem/fetchFilesystem");
    },

    filesystemReload() {
      this.currentFolder = {};
      this.currentFile = {};
      this.currentFullPath = "/";
      this.curentFolderPath = "/";
      this.open = [];
      this.$store.dispatch("filesystem/fetchFilesystem");
    },

    triggerForUploadFile() {
      this.$refs.file.click();
    },

    openDialogForRemoveConfirm(bool) {
      this.isRemoveConfirmDialog = bool;
    },

    openDialogForCreateFolder(bool) {
      this.isCreateFolderDialog = bool;
    }
  }
};
</script>

<style lang="sass">
.filesystem
  &--window
    max-height: 100vh
  &--tree
    height: 100%
    .flex
      flex: auto
    &-list
      height: 94%
      overflow: auto
.v-treeview-node__root
  position: relative
.treeview-node-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
.tree
  overflow-x: auto
.file-name
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.storage-control
  cursor: pointer
.active-treeview-node
  background-color: rgba(lightgrey, 0.5)
.active-card-file
  background-color: #062745
  color: #fff
.input-file
  display: none
.file-download
  text-decoration: none
</style>
