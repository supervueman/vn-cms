const mutations = {
  SET_FILESYSTEM(state, payload) {
    const filesystem = [payload];

    function recursiveFilesystem(files) {
      files.forEach(el => {
        el.path = el.path.substr(3, el.path.length);
        if (el.path.slice(-1) === '/') {
          el.path = el.path.slice(0, el.path.length - 1)
        }
        if (el.type === 'directory') {
          recursiveFilesystem(el.children);
          return;
        } else {
          return;
        }
      });
    }
    recursiveFilesystem(filesystem);

    state.filesystem = filesystem;
  },
  SET_FOLDER_CONTENT(state, payload) {
    state.folderContent = payload;
  }
};

export default mutations;
