const {
  readdirSync
} = require('fs');

module.exports = async () => {
  const getDirectories = source =>
    readdirSync(source, {
      withFileTypes: true
    })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const dirs = getDirectories('./components');

  for await (const el of dirs) {
    const init = require(`../../components/${el}`).init;
    if (init) {
      await init();
    }
  }
};
