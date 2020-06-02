const { readdirSync } = require('fs');

const lang = require('../../core/modules/lang/init');
const lexicon = require('../../core/modules/lexicon/init');
const systemsetting = require('../../core/modules/systemsetting/init');
const context = require('../../core/modules/context/init');
const role = require('../../core/modules/role/init');
const user = require('../../core/modules/user/init');
const layout = require('../../core/modules/layout/init');
const resourcetype = require('../../core/modules/resourcetype/init');

const getDirectories = (source) =>
  readdirSync(source, {
    withFileTypes: true
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const dirs = getDirectories('./modules');

module.exports = async () => {
  await lang();
  await lexicon();
  await systemsetting();
  await context();
  await role();
  await user();
  await layout();
  await resourcetype();

  for await (const el of dirs) {
    const init = require(`../../modules/${el}`).init;
    if (init) {
      await init();
    }
  }
};
