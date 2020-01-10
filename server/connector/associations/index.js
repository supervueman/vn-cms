const {
  readdirSync
} = require('fs');

const getDirectories = source =>
  readdirSync(source, {
    withFileTypes: true
  })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = () => {
  const dirs = getDirectories('./components');

  dirs.forEach(el => {
    const config = require(`../../components/${el}/config`);
    if (config.associations) {
      config.associations.forEach(item => {
        if (item.association_dir_path) {
          require(`../../components/${item.association_dir_path}`)();
        }
      });
    }
  });
};
