const { readdirSync } = require('fs');

const getDirectories = (source) =>
  readdirSync(source, {
    withFileTypes: true
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const dirs = getDirectories('./modules');

const coreModulesDirs = getDirectories('./core/modules');

module.exports = () => {
  const paths = [];

  for (const el of coreModulesDirs) {
    const swaggerPaths = require(`../../core/modules/${el}/config`)
      .swaggerPaths;

    if (swaggerPaths) {
      const transformPaths = swaggerPaths.map(
        (elem) => `./core/modules/${el}/${elem}`
      );
      paths.push(...transformPaths);
    }
  }

  for (const el of dirs) {
    const swaggerPaths = require(`../../modules/${el}/config`).swaggerPaths;

    if (swaggerPaths) {
      const transformPaths = swaggerPaths.map(
        (elem) => `./modules/${el}/${elem}`
      );
      paths.push(...transformPaths);
    }
  }

  return paths;
};
