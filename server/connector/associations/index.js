const { readdirSync } = require('fs');

const lexicon = require('../../core/modules/lexicon/association');
const context = require('../../core/modules/context/association');
const user = require('../../core/modules/user/association');
const field = require('../../core/modules/field/association');
const additionalfield = require('../../core/modules/additionalfield/association');
const layout = require('../../core/modules/layout/association');
const rersource = require('../../core/modules/resource/association');

const getDirectories = (source) =>
  readdirSync(source, {
    withFileTypes: true
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const dirs = getDirectories('./modules');

module.exports = () => {
  lexicon();
  context();
  user();
  field();
  additionalfield();
  layout();
  rersource();

  dirs.forEach((el) => {
    const config = require(`../../modules/${el}/config`);

    if (config.associations) {
      config.associations.forEach((item) => {
        if (item.association_dir_path) {
          require(`../../modules/${item.association_dir_path}`)();
        }
      });
    }
  });
};
