const dirTree = require("directory-tree");

module.exports = function readDir(dirPath) {
  return dirTree(`../files/${dirPath}`, {
    normalizePath: true
  });
};
