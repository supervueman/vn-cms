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
    if (el !== 'profile' && el !== 'authenticate') {
      const config = require(`../../components/${el}/config`);
      config.associations.forEach(item => {
        require(`../../components/${item.association_dir_path}`)();
      });
    }
  });
};
