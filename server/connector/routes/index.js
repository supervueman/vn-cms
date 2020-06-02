const { readdirSync } = require('fs');

const lang = require('../../core/modules/lang/routes');
const lexicon = require('../../core/modules/lexicon/routes');
const systemsetting = require('../../core/modules/systemsetting/routes');
const context = require('../../core/modules/context/routes');
const role = require('../../core/modules/role/routes');
const user = require('../../core/modules/user/routes');
const mail = require('../../core/modules/mail/routes');
const profile = require('../../core/modules/profile/routes');
const authenticate = require('../../core/modules/authenticate/routes');
const fieldcategory = require('../../core/modules/fieldcategory/routes');
const field = require('../../core/modules/field/routes');
const additionalfield = require('../../core/modules/additionalfield/routes');
const layout = require('../../core/modules/layout/routes');
const resourcetype = require('../../core/modules/resourcetype/routes');
const rersource = require('../../core/modules/resource/routes');

const getDirectories = (source) =>
  readdirSync(source, {
    withFileTypes: true
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

module.exports = async (app) => {
  app.use('/langs', lang);
  app.use('/lexicons', lexicon);
  app.use('/systemsettings', systemsetting);
  app.use('/contexts', context);
  app.use('/roles', role);
  app.use('/users', user);
  app.use('/mail', mail);
  app.use('/profile', profile);
  app.use('/authenticate', authenticate);
  app.use('/fieldcategories', fieldcategory);
  app.use('/fields', field);
  app.use('/additionalfields', additionalfield);
  app.use('/layouts', layout);
  app.use('/resourcetypes', resourcetype);
  app.use('/resources', rersource);

  const dirs = getDirectories('./components');

  dirs.forEach((el) => {
    const config = require(`../../components/${el}/config`);

    if (config.routes) {
      config.routes.forEach((item) => {
        if (item.base_route_name) {
          app.use(
            `/${item.base_route_name}`,
            require(`../../components/${item.route_dir_path}`)
          );
        }
      });
    }
  });
};
