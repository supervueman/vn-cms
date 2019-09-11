const dirTree = require("directory-tree");

module.exports = dirPath => dirTree(`../files/${dirPath}`, {
  normalizePath: true
});
