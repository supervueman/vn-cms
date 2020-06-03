import Vue from 'vue';
import Router from 'vue-router';

/**
 * Automatically imports all the modules and exports as a single module object
 */
const coreModules = {};
const modules = {};

let corePaths = [];
let paths = [];

const requireModule = require.context('../modules', true, /\.route\.js$/);
const requireCoreModule = require.context(
  '../core/modules',
  true,
  /\.route\.js$/
);

requireCoreModule.keys().forEach((filename) => {
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename.replace(/(\.\/|\/\index\.route\.js)/g, '');

  coreModules[moduleName] =
    requireCoreModule(filename).default || requireCoreModule(filename);

  coreModules[moduleName].forEach((el) => {
    el.componentPath = `${moduleName}/pages/${el.component}.vue`;
  });

  corePaths = corePaths.concat(coreModules[moduleName]);
});

requireModule.keys().forEach((filename) => {
  // create the module name from fileName
  // remove the store.js extension and capitalize
  const moduleName = filename.replace(/(\.\/|\/\index\.route\.js)/g, '');

  modules[moduleName] =
    requireModule(filename).default || requireModule(filename);

  modules[moduleName].forEach((el) => {
    el.componentPath = `${moduleName}/pages/${el.component}.vue`;
  });

  paths = paths.concat(modules[moduleName]);
});

/**
 * @function route
 * @param {string} path
 * @param {string} name
 * @param {component} component
 * @returns {object}
 * Функция возвращает объект роутера
 */

function routeCore(path, name, component, componentPath, meta) {
  return {
    path,
    name,
    meta,
    component: () => import(`@/core/modules/${componentPath}`)
  };
}

function route(path, name, component, componentPath, meta) {
  return {
    path,
    name,
    meta,
    component: () => import(`@/modules/${componentPath}`)
  };
}

Vue.use(Router);

const coreRoutes = corePaths.map((path) =>
  routeCore(path.path, path.name, path.component, path.componentPath, path.meta)
);

const routes = paths.map((path) =>
  route(path.path, path.name, path.component, path.componentPath, path.meta)
);

export default new Router({
  mode: 'history',
  routes: [...coreRoutes, ...routes]
});
