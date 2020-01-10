const {
  readdirSync
} = require('fs');

const getDirectories = source =>
  readdirSync(source, {
    withFileTypes: true
  })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

module.exports = (app) => {
  const dirs = getDirectories('./components');

  dirs.forEach(el => {
    const config = require(`../../components/${el}/config`);
    if (config.routes) {
      config.routes.forEach(item => {
        if (item.base_route_name) {
          app.use(`/${item.base_route_name}`, require(`../../components/${item.route_dir_path}`));
        }
      });
    }
  });
};
