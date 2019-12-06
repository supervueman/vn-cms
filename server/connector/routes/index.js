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
  const authenticate = require('../../components/authenticate');
  const profile = require('../../components/profile');
  app.use('/authenticate', authenticate.routes);
  app.use('/profile', profile.routes);

  const dirs = getDirectories('./components');

  dirs.forEach(el => {
    if (el !== 'profile' && el !== 'authenticate') {
      const config = require(`../../components/${el}/config`);
      config.routes.forEach(item => {
        app.use(`/${item.base_route_name}`, require(`../../components/${item.route_dir_path}`));
      });
    }
  });
};
