const dirTree = require("directory-tree");

module.exports = function readDir(dirPath) {
  const path = `../files/${dirPath}`;
  const filesystem = dirTree(path, {
    normalizePath: true
  });
  return filesystem;
};
