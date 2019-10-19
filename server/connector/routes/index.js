const pluralize = require('pluralize');
const {
  readdirSync
} = require('fs');


module.exports = (app) => {
  const authenticate = require('../../components/authenticate');
  const profile = require('../../components/profile');
  app.use('/authenticate', authenticate.routes);
  app.use('/profile', profile.routes);

  const getDirectories = source =>
    readdirSync(source, {
      withFileTypes: true
    })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const dirs = getDirectories('./components');

  dirs.forEach(el => {
    if (el !== 'profile' && el !== 'authenticate') {
      app.use(`/${pluralize(el)}`, require(`../../components/${el}`).routes);
    }
  });
}
